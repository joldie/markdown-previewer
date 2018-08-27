import React, { Component } from 'react';
import marked from 'marked';
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
      <div className='pageWrapper'>
        <header>
          <h1>Markdown Previewer</h1>
        </header>
        <div id='input' className='textWindow'>
          <Editor markdown={this.state.markdown}
            onChange={this.handleChange} />
        </div>
        <div id='output' className='textWindow'>
          <Preview markdown={this.state.markdown} />
        </div>
        <footer>
          Footer text here.
        </footer>
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <textarea id="editor" value={props.markdown} onChange={props.onChange} type="text" className='fullWidth' />
  )
}

const Preview = (props) => {
  return (
    // dangerouslySetInnerHTML used in React as editor input not sanitized
    <div id='preview' dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />
  )
}

const inputText =
  `# Markdown Previewer

## This is a sub-heading...
### This is a sub-sub-heading...

`

export default App;
