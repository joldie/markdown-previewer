import React, { Component } from 'react';
import './stylesheet.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: inputText
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  render() {
    return (
      <div>
        <div>
          <Editor markdown={this.state.markdown}
            onChange={this.handleChange} />
        </div>
        <div>
          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text" />
  )
}

const Preview = (props) => {
  return (
    <div id='preview' />
  )
}

const inputText =
  `# Markdown Previewer

## This is a sub-heading...
### This is a sub-sub-heading...

`

export default App;
