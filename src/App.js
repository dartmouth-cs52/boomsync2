import React, { Component } from 'react'
import { Button, Layout } from 'antd';
import './App.css'
import Play from './Play'
import Preview from './Preview'
import levels from './levels'
import CodeEditor from './CodeEditor'
import LevelIndicator from './LevelIndicator'

const { Header, Content } = Layout

export default class App extends Component {
  state = {
    playing: false,
    level: 0,   // this is just an index
    isSubmitted: false,
    failed: null,
    done: false
  }

  handleClick = () => print(this.state.done)
    ? this.setState(prevState => ({
        playing: false,
        isSubmitted: false,
        code: null,
        done: false,
        level: prevState.level + 1
      }))
    : this.setState(prevState => ({
        playing: true,
        isSubmitted: true,
        code: this.refs.code.getContents()
      }))

  handleResetClick = () => { // TODO
    this.setState(() => ({
      playing: false,
      done: false,
      failed: null
    }))
  }

  succeed = () => {
    this.setState(() => ({
      failed: false,
      done: true,
      playing: false,
    }))
  }

  fail = (err) => {
    this.setState(() => ({
      failed: err,
      playing: false
    }))
  }

  play = () => this.setState({ playing: true })

  render() {
    const { playing, level, code } = this.state
    console.log(level)
    const description = levels[level].instructions.join('<br/> <br/>')
    const initialCode = levels[level].initialCode
    const lineStart = levels[level].lineStart

    return (
      <div className="App">
        <div className="Left-sidebar">
          <Layout>
            <Header>
              <LevelIndicator level={level + 1} />
            </Header>
            <Content style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="Game-description">
                <span dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <CodeEditor {...{initialCode, lineStart}} ref='code'
                style={{flex: 1, minHeight: '200px'}}
              />
              <div style={{
                  display: 'flex',
                  margin: 5,
                  justifyContent: 'space-around'
                }}
              >
                <Button type="danger" onClick={this.handleResetClick}>
                  Reset
                </Button>
                <Button type="primary" loading={this.state.playing} onClick={this.handleClick}>
                  {this.state.isSubmitted
                    ? this.state.playing
                      ? this.state.failed
                        ? 'Try Again'
                        : 'Running'
                      : 'Next'
                    : 'Submit'
                  }
                </Button>
              </div>
            </Content>
          </Layout>
        </div>
        <div className="Right-sidebar">
          { playing
            ? <Play {...{level: levels[level], code, fail: this.fail, succeed: this.succeed}} />
            : <Preview {...{level}} />
          }
        </div>
      </div>
    );
  }
}
