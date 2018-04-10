import React, { Component } from 'react';
import Bluebird from 'bluebird';

import './Play.css';

import brokenBoomerang from './assets/boomerang_brokenBoom.svg';
import redBoomerang from './assets/boomerang_redBoom.svg';
import tapedBoomerang from './assets/boomerang_tapedBoom.svg';
import back from './assets/back.svg';

import swoopSound from './assets/swoop.mp3';
import breakSound from './assets/break.mp3';
import collisionSound from './assets/collision.mp3';

import Birdie from './assets/birdie.inline.svg';
import FallingBirdie from './assets/birdie-falling.inline.svg';

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
  state = {
    boomerangs: new Array(2).fill(null).map((_, idx) => defaultBoomerang(idx)),
  }

  // eslint-disable-next-line
  failed = false;

  fail = (err) => {
    clearInterval(this.tickIntervalId);
    this.failed = true;
    this.props.fail(err || { name: 'Failure', message: 'A bird escaped!' });
  }

  tickIntervalId = null

  componentWillMount() {
    if (!playCoords) setPlayCoords();
    boomSpeed = (playCoords[1] / boomReturnTime) * 2;

    this.state.birds = this.props.level.events.filter(({ type, time }) => type.includes('bird'))
      .map(({ type, time }) =>
        (type === 'brokenbird' ? ({
          id: `${type}${time}`, coords: [100 + (time * birdSpeed), 50], dead: false, broken: true,
        }) :
          ({ id: `${type}${time}`, coords: [100 + (time * birdSpeed), 50], dead: false })
        ));
  }

  componentWillUnmount() {
    clearInterval(this.tickIntervalId);
    this.tickIntervalId = null;
  }

  componentDidMount() {
    let queuedBoomerangs = 0;

    // define fixBoomerang
    // eslint-disable-next-line
    const fixBoomerangs = (fn) => {
      this.state.boomerangs.forEach(b => (b.broken = false));
      this.forceUpdate();
      fn && fn(null, {});
      this.state.fixing = false;
    };

    // get index of the first boomerang that is not being thrown right now
    const getAvailableBoomerang = (boomerangs) => {
      return boomerangs.findIndex(b => !b.throwing);
    };

    // define throwBoomerang
    // eslint-disable-next-line
    const throwBoomerang = (fn) => {
      const bidx = getAvailableBoomerang(this.state.boomerangs);
      if (bidx === -1) {
        this.failed = true;
        return this.fail({ name: 'Failure', message: `Sorry, you cannot throw more than ${2} boomerangs at once` });
      }
      if (this.state.boomerangs[bidx].broken) {
        this.failed = true;
        return this.fail({ name: 'Failure', message: 'Trying to throw a broken boomerang' });
      }

      ++queuedBoomerangs;
      this.state.boomerangs[bidx] = generateBoomerang(bidx);
      this.forceUpdate();

      setTimeout(() => { // TODO handle error
        this.state.boomerangs[bidx] = {
          coords: this.state.boomerangs[bidx].coords,
          rotation: this.state.boomerangs[bidx].rotation,
          flightAngle: this.state.boomerangs[bidx].flightAngle,
          wayBack: this.state.boomerangs[bidx].wayBack,
          broken: this.state.boomerangs[bidx].broken,
          throwing: false,
        };
        this.forceUpdate();

        if (this.state.boomerangs[bidx].broken) {
          fn(Error('Boomerang is broken'), {});
          console.log('BOOMERANG IS BROKEN!');
        } else {
          // if a reference to a function is called, then there is no callback, fn is an empty Object
          // lol
          fn && typeof fn === 'function' && fn(null, {});
        }
        queuedBoomerangs--;
        if (queuedBoomerangs === 0 && !this.failed) {
          if (this.state.birds.filter(b => !b.dead).length === 0) {
            return this.props.succeed();
          }
        }
      }, boomReturnTime);
    };

    // eslint-disable-next-line
    const promiseBoomerang = Bluebird.promisify(throwBoomerang);

    // chill function
    // don't use this
    // eslint-disable-next-line
    const chill = (ms, fn) => {
      setTimeout(() => fn && typeof fn === 'function' && fn(null, {}), ms);
    };

    try {
      // eslint-disable-next-line
      const bluebird = Bluebird; // need bluebird in context for eval
      // TODO: replace bluebird with babel
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
