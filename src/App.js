import React, { Component } from 'react';
import { Button, Layout } from 'antd';
import './App.css';
import Play from './Play';
import Preview from './Preview';
import levels from './levels';
import CodeEditor from './CodeEditor';
import ErrorBox from './ErrorBox';
import LevelIndicator from './LevelIndicator';

import logo from './assets/logo_wide.png';

const { Header, Content } = Layout;
const ButtonGroup = Button.Group;

export default class App extends Component {
  state = {
    playing: false,
    level: 0, // this is just an index
    isSubmitted: false,
    failed: null,
    readyForNext: false,
    win: false,
    leftWidth: 40, // percentage
    hintsShown: 0, // hints stay revealed across retries, reset on level change
  }

  // Resizable divider handlers
  handleDividerMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', this.handleDividerMouseMove);
    document.addEventListener('mouseup', this.handleDividerMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  handleDividerMouseMove = (e) => {
    const containerWidth = window.innerWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;
    // Clamp between 25% and 65%
    if (newLeftWidth >= 25 && newLeftWidth <= 65) {
      this.setState({ leftWidth: newLeftWidth });
    }
  }

  handleDividerMouseUp = () => {
    document.removeEventListener('mousemove', this.handleDividerMouseMove);
    document.removeEventListener('mouseup', this.handleDividerMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  handleClick = () => (this.state.readyForNext
    ? this.setState(prevState => ({
      playing: false,
      isSubmitted: false,
      code: null,
      readyForNext: false,
      level: prevState.level + 1,
      failed: null,
      hintsShown: 0,
    }))
    : this.setState(prevState => ({
      playing: true,
      isSubmitted: true,
      code: this.codeEditor.getContents(),
      failed: null,
    })))

  changePage = (page) => {
    this.setState(() => ({
      isSubmitted: false,
      level: page - 1,
      readyForNext: false,
      playing: false,
      failed: null,
      hintsShown: 0,
    }));
    this.codeEditor.reloadProps(this.initialCode(page - 1));
  }

  showHint = () => {
    this.setState(
      prevState => ({ hintsShown: prevState.hintsShown + 1 }),
      () => this.lastHint && this.lastHint.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
    );
  }

  succeed = () => {
    if (this.state.level === Object.keys(levels).length - 1) {
      // completed last level!
      this.setState(() => ({
        playing: false,
        readyForNext: false,
        win: true,
      }));
    } else {
      this.setState(() => ({
        playing: false,
        readyForNext: true,
      }));
    }
  }

  fail = (err) => {
    this.setState(() => ({
      failed: err,
      playing: false,
    }));
  }

  play = () => this.setState({ playing: true })


  replay = () => {
    this.setState(() => ({
      playing: true,
      isSubmitted: true,
      failed: null,
      code: this.codeEditor.getContents(),
    }));
  }


  initialCode = level => levels[level].initialCode

  handleResetClick = () => {
    this.setState(() => ({
      isSubmitted: false,
      playing: false,
      readyForNext: false,
      failed: null,
      code: this.initialCode(this.state.level),
    }));
    this.codeEditor.reloadProps(this.initialCode(this.state.level));
  }


  render() {
    const {
      playing, level, code, failed, hintsShown,
    } = this.state;
    const totalLevels = Object.keys(levels).length;
    const description = levels[level].instructions.join('<br/> <br/>');
    const hints = levels[level].hints || [];
    const hintLabel = hintsShown === 0 ? 'Hint' : hintsShown < hints.length ? 'Another hint' : 'No more hints';
    const initialCode = this.initialCode(level);
    // const lineStart = levels[level].lineStart;

    return (
      <div className="App">
        <div className="Left-sidebar" style={{ width: `${this.state.leftWidth}%` }}>
          <Layout>
            <Header style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
            >
              <img src={logo} alt="logo" height="90%" />
              <LevelIndicator changePage={this.changePage} level={level + 1} totalLevels={totalLevels} />
            </Header>
            <Content style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f9f7f0',
            }}
            >
              <div className="Game-description">
                <span dangerouslySetInnerHTML={{ __html: description }} />
                {hintsShown > 0 && (
                  <div className="Hints">
                    {hints.slice(0, hintsShown).map((hint, idx) => (
                      <div
                        className="Hint"
                        key={`${level}-${idx}`}
                        ref={idx === hintsShown - 1 ? (el) => { this.lastHint = el; } : undefined}
                      >
                        <strong>Hint {idx + 1}/{hints.length}:</strong>&nbsp;
                        <span dangerouslySetInnerHTML={{ __html: hint }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <CodeEditor
                {...{ initialCode, failed, playing }}
                ref={((c) => { this.codeEditor = c; })}
                style={{ flex: 1, minHeight: '200px' }}
              />
              <p>Errors:</p>
              <ErrorBox {...{ failed }} />
              <div style={{
                display: 'flex',
                margin: 5,
                justifyContent: 'space-around',
                padding: 10,
              }}
              >
                <Button type="primary" danger onClick={this.handleResetClick}>
                  Reset
                </Button>
                {hints.length > 0 && (
                  <Button onClick={this.showHint} disabled={hintsShown >= hints.length}>
                    {hintLabel}
                  </Button>
                )}
                <ButtonGroup>
                  {
                    this.state.readyForNext && !this.state.playing ? <Button type="default" onClick={this.replay}> Replay </Button> : ''
                  }
                  { 
                    !this.state.win ? <Button type="primary" loading={this.state.playing} onClick={this.handleClick}>
                    {this.state.isSubmitted
                      ? !this.state.playing
                        ? this.state.readyForNext
                          ? 'Next Level'
                          : 'Try Again'
                        : 'Running'
                      : 'Submit'
                    }
                    </Button> : <div> you won! </div>
                  }
                </ButtonGroup>

              </div>
            </Content>
            <div className="foot">
              Game by:&nbsp;
              <a href="http://irenefeng.com/">Irene Feng</a>,&nbsp;
              <a href="https://github.com/ben-pr-p">Ben Packer</a>,&nbsp;
              <a href="https://byrnehollander.com/">Byrne Hollander</a>,&nbsp;
              <a href="http://jennyseong.me/">Jenny Seong</a>,<br />
              version2.1 updated and modified by <a href="http://zingweb.com/">Tim Tregubov</a><br />
              <a href="https://github.com/timofei7/boomsync2">github codes</a>
            </div>
          </Layout>
        </div>
        <div
          className="Resizer"
          onMouseDown={this.handleDividerMouseDown}
        />
        <div className="Right-sidebar">
          { playing
            ? <Play {...{
              level: levels[level], code, fail: this.fail, succeed: this.succeed,
            }}
            />
            : <Preview {...{ level }} />
          }
        </div>
      </div>
    );
  }
}
