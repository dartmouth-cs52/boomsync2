import React, { Component } from 'react';
import { produce } from "immer"

import './Play.css';

import brokenBoomerang from './assets/boomerang_brokenBoom.svg';
import redBoomerang from './assets/boomerang_redBoom.svg';
import tapedBoomerang from './assets/boomerang_tapedBoom.svg';
import back from './assets/back.svg';

import swoopSound from './assets/swoop.mp3';
import breakSound from './assets/break.mp3';
import collisionSound from './assets/collision.mp3';

import {ReactComponent as Birdie} from './assets/birdie.inline.svg';
import {ReactComponent as FallingBirdie} from './assets/birdie-falling.inline.svg';

const birdSpeed = 0.25; // .25
const boomReturnTime = 3000; // 3000
const tickInterval = 50; // 50
let boomSpeed = 0.5; // .5
let playCoords;

const dist = ([x1, y1], [x2, y2]) => Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));

function setPlayCoords() {
  playCoords = [
    document.querySelector('.Right-sidebar').offsetWidth,
    document.querySelector('.Right-sidebar').offsetHeight,
  ];
}

function defaultBoomerang(idx) {
  if (!playCoords) setPlayCoords();

  return {
    coords: [0, playCoords[1] + 100],
    rotation: 45 * idx,
    flightAngle: 0,
    wayBack: false,
    broken: false,
    throwing: false,
  };
}
function generateBoomerang(idx) {
  return {
    coords: [0, playCoords[1]],
    rotation: 45 * idx,
    flightAngle: 0,
    wayBack: false,
    broken: false,
    throwing: true,
  };
}

function formatCoords(coords, radius) {
  if (!playCoords) setPlayCoords();
  return `${(Math.floor(coords[0] + (playCoords[0] / 2)) - radius)}px, ${coords[1] - radius}px`;
}


export default class Play extends Component {
  constructor(props) {
    super(props);
    if (!playCoords) setPlayCoords();
    boomSpeed = (playCoords[1] / boomReturnTime) * 2;

    const birds = props.level.events.filter(({ type, time }) => type.includes('bird'))
      .map(({ type, time }) =>
        (type === 'brokenbird' ? ({
          id: `${type}${time}`, coords: [100 + (time * birdSpeed), 50], dead: false, broken: true,
        }) :
          ({ id: `${type}${time}`, coords: [100 + (time * birdSpeed), 50], dead: false })
        ));

    this.state = {
      boomerangs: new Array(props.level.boomerangs || 2).fill(null).map((_, idx) => defaultBoomerang(idx)),
      birds
    };
  }

  // eslint-disable-next-line
  failed = false;

  // lesson checks: >0 while the player's throwBoomerang callback is running,
  // how many throws so far, and whether dinner (alert) was served at the right time
  inCallback = 0;
  throwCount = 0;
  dinnerCalled = false;

  // the player's code can leave timers running after this run ends (reset, try again, next level);
  // once unmounted, those stale timers must not reach back into App and fail or pass the new run
  unmounted = false;

  fail = (err) => {
    if (this.unmounted) return;
    clearInterval(this.tickIntervalId);
    this.failed = true;
    this.props.fail(err || { name: 'Failure', message: 'A bird escaped!' });
  }

  tickIntervalId = null

  // a broken-boomerang error from this run that nobody handled (e.g. an await with no try/catch):
  // show it now, the way the browser console words it, instead of waiting for a bird to escape.
  // Errors are tagged per run so a stale run's rejection can't fail a new one.
  onUnhandledRejection = (event) => {
    const reason = event.reason;
    if (reason && reason.run === this) {
      this.fail({ name: 'Uncaught (in promise) Error', message: reason.message });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection);
    this.unmounted = true;
    clearInterval(this.tickIntervalId);
    this.tickIntervalId = null;
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection);
    let queuedBoomerangs = 0;

    // define fixBoomerang
    // eslint-disable-next-line
    const fixBoomerangs = (fn) => {
      if (this.unmounted) return;
      this.state.boomerangs.forEach(b => (b.broken = false));
      this.forceUpdate();
      fn && typeof fn === 'function' && fn(null, {});
      this.state.fixing = false;
    };

    // get index of the first boomerang that is not being thrown right now
    const getAvailableBoomerang = (boomerangs) => {
      return boomerangs.findIndex(b => !b.throwing);
    };

    // define throwBoomerang
    // eslint-disable-next-line
    const throwBoomerang = (fn) => {
      if (this.unmounted) return;
      const bidx = getAvailableBoomerang(this.state.boomerangs);
      const count = this.state.boomerangs.length;
      if (bidx === -1) {
        this.failed = true;
        return this.fail({
          name: 'Failure',
          message: count === 1
            ? 'You only have 1 boomerang: wait for it to come back before throwing again'
            : `Sorry, you cannot throw more than ${count} boomerangs at once`,
        });
      }
      if (this.state.boomerangs[bidx].broken) {
        this.failed = true;
        return this.fail({ name: 'Failure', message: 'Trying to throw a broken boomerang' });
      }
      // a level about callbacks: every throw after the first has to come from inside a callback, not a timer
      if (this.props.level.requireCallback && this.throwCount > 0 && this.inCallback === 0) {
        this.failed = true;
        return this.fail({
          name: 'Failure',
          message: 'Your next throw has to come from the callback: pass throwBoomerang a function that throws again',
        });
      }

      this.throwCount += 1;
      ++queuedBoomerangs;
      //TODO: use produce to update state rather than the forceUpdate thing people have been doing
      const newBoomerangs = produce(this.state.boomerangs, draft => {
        draft[bidx] = generateBoomerang(bidx);
      })
      this.setState({boomerangs: newBoomerangs});

      setTimeout(() => { // TODO handle error
        if (this.unmounted) return;
        this.state.boomerangs[bidx] = {
          coords: this.state.boomerangs[bidx].coords,
          rotation: this.state.boomerangs[bidx].rotation,
          flightAngle: this.state.boomerangs[bidx].flightAngle,
          wayBack: this.state.boomerangs[bidx].wayBack,
          broken: this.state.boomerangs[bidx].broken,
          throwing: false,
        };
        this.forceUpdate();

        // the player's callback can be missing (passed by reference, fn is an empty Object) or can throw;
        // either way the timer must reach queuedBoomerangs--, and a throw should show up in the error box
        this.inCallback += 1;
        try {
          if (this.state.boomerangs[bidx].broken) {
            console.log('BOOMERANG IS BROKEN!');
            const err = Error('Boomerang is broken');
            Object.defineProperty(err, 'run', { value: this }); // non-enumerable: invisible if the player logs err
            fn && typeof fn === 'function' && fn(err, {});
          } else {
            fn && typeof fn === 'function' && fn(null, {});
          }
        } catch (err) {
          this.fail(err);
        } finally {
          this.inCallback -= 1;
        }
        queuedBoomerangs--;
        if (queuedBoomerangs === 0 && !this.failed && !this.unmounted) {
          if (this.state.birds.filter(b => !b.dead).length === 0) {
            if (this.props.level.alertMeansDone && !this.dinnerCalled) {
              return this.fail({
                name: 'Failure',
                message: 'Nobody called dinner! Call alert(\'dinner!\') when the boomerang comes back',
              });
            }
            return this.props.succeed();
          }
        }
      }, boomReturnTime);
    };

    // Promise-wrapped version of throwBoomerang
    // eslint-disable-next-line
    const promiseBoomerang = () => {
      return new Promise((resolve, reject) => {
        throwBoomerang((err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    // the player's code sees this alert instead of window.alert. On the dinner level it checks the timing:
    // alert('dinner!') has to wait until the bird is down and the boomerang is back in your hand
    // eslint-disable-next-line
    const alert = (...args) => {
      if (this.unmounted) return;
      window.alert(...args);
      if (!this.props.level.alertMeansDone || this.failed) return;
      if (this.state.birds.some(b => !b.dead) || this.state.boomerangs.some(b => b.throwing)) {
        this.failed = true;
        this.fail({ name: 'Failure', message: 'Dinner before the hunt! alert() ran before your boomerang came back' });
        return;
      }
      this.dinnerCalled = true;
    };

    try {
      eval(this.props.code);
    } catch (err) {
      this.fail(err);
    }

    this.tickIntervalId = setInterval(this.tick, tickInterval);
  }

  tick = () => {
    // check for crossed birds
    const birdsCrossed = this.state.birds.filter(b => b.coords[0] < -300);
    // check for collisions
    const birdsDead = this.state.birds.map(b => (b.dead
      ? true
      : this.state.boomerangs.filter(({ coords }) => dist(b.coords, coords) < 50).length > 0));
    // check for returned boomerangs
    const boomerangsReturned = this.state.boomerangs.map(b => false); // TODO

    // Check if game is over
    if (birdsCrossed.length > 0) {
      return this.fail({ name: 'Failure', message: 'A bird escaped!' });
    }

    // Update bird position
    this.state.birds = this.state.birds.map((b, idx) => (!birdsDead[idx]
      ? ({
        id: b.id, coords: [b.coords[0] - (birdSpeed * tickInterval), b.coords[1]], broken: b.broken, dead: false,
      })
      : ({
        id: b.id, coords: [b.coords[0] + 10, b.coords[1] + 10], broken: b.broken, dead: true,
      })));

    const gotBroken = b =>
      this.state.birds.filter(({ coords, broken }) => (broken && dist(b.coords, coords) < 50)).length > 0;
    // Check if any boomerangs were broken by hitting a broken bird
    const boomerangsBroken = this.state.boomerangs.map(b => (b.broken
      ? true
      : gotBroken(b)));

    // Update boomerang position
    this.state.boomerangs = this.state.boomerangs.map(({
      coords, rotation, flightAngle, wayBack, broken, throwing,
    }, idx) =>
      (throwing
        ? wayBack || coords[1] < 50
          ? ({
            coords: [coords[0], coords[1] + (boomSpeed * tickInterval)], // going down
            rotation: rotation + tickInterval, // TODO
            flightAngle: flightAngle + 1, // TODO
            wayBack: true,
            broken: broken ? true : boomerangsBroken[idx],
            throwing: true,
          })
          : ({
            coords: [coords[0], coords[1] - (boomSpeed * tickInterval)], // going up
            rotation: rotation + tickInterval, // TODO
            flightAngle: flightAngle + 1, // TODO
            wayBack: false,
            broken: broken ? true : boomerangsBroken[idx],
            throwing: true,
          })
        :
        ({
          coords: [coords[0], playCoords[1] + 50],
          rotation: rotation + tickInterval, // TODO
          flightAngle: flightAngle + 1, // TODO
          wayBack: false,
          broken: broken ? true : boomerangsBroken[idx],
          throwing: false,
        })));
    return this.forceUpdate();
  }

  render() {
    const { birds, boomerangs } = this.state;

    return (
      <div className="play">
        {birds.map((b, idx) => (
          <div className="smooth" key={b.id} style={{ transform: `translate(${formatCoords(b.coords, 50)})` }} >
            {!b.dead
              ? <Birdie className="bird" height={100} width={100} />
              : <FallingBirdie className="bird" height={100} width={100} /> }
          </div>
        ))}

        {/* insert audio elements during various states */}
        {birds.filter(b => b.dead).map((b, idx) => (
          <audio src={collisionSound} key={idx} autoPlay="true" /> //eslint-disable-line
        ))}
        {boomerangs.filter(b => b.broken).map((b, idx) => (
          <audio src={breakSound} key={idx} autoPlay="true" /> //eslint-disable-line
        ))}
        {boomerangs.filter(b => b.throwing).map((b, idx) => (
          <audio src={swoopSound} key={`swoop-${idx}`} autoPlay="true" />//eslint-disable-line
        ))}

        {boomerangs.map((b, idx) => (
          <div key={idx} className="smooth" style={{ transform: `translate(${formatCoords(b.coords, 40)})` }} >
            <img alt="broken"
              src={!b.broken
                ? [tapedBoomerang, redBoomerang][idx % 2] :
                [brokenBoomerang, brokenBoomerang][idx % 2]
              }
              className="smooth-rotate boomerang"
              key={`${idx}-${b.coords}`}
              style={{ transform: `rotate(${b.rotation}deg)` }}
            />
          </div>
        ))}

        <img alt="back"
          src={back}
          style={{
            transform: `translate(${formatCoords([0, playCoords[1] - 50], 50)})`,
            height: 100,
            width: 100,
          }}
        />
      </div>
    );
  }
}
