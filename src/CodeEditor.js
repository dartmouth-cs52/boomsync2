import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_light';
import 'brace/ext/language_tools';

export default class CodeEditor extends Component {
  state = {
    value: '',
  }

  componentWillMount() {
    this.state.value = this.props.initialCode;
  }

  // componentWillReceiveProps() {
  //   if (this.props.failed || this.props.playing) {
  //   } else {
  //     this.state.value = this.props.initialCode;
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialCode !== this.props.initialCode) { this.reloadProps(nextProps.initialCode); }
  }

  getContents = () => this.state.value

  reloadProps = (code) => {
    this.setState({
      value: code || this.props.initialCode,
    });
  }

  handleChange = value => this.setState({ value })

  render() {
    return (
      <AceEditor
        mode="javascript"
        theme="solarized_light"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          fontSize: 16,
        }}
        tabSize={2}
        value={this.state.value}
        onChange={this.handleChange}
        height="50%"
        width="100%"
        style={this.props.style}
      />
    );
  }
}
