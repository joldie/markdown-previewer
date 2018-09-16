import React, { Component } from 'react';
import marked from 'marked';
import './stylesheet.css';

const mql = window.matchMedia(`(max-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: inputText,
      displayEditor: true,
      smallScreen: mql.matches
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({
      smallScreen: mql.matches
    });
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }

  toggleView = () => {
    this.setState({
      displayEditor: !this.state.displayEditor
    });
  }

  render() {
    return (
      <div className='pageWrapper'>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
        <header>
          <h1><i id="markdown-logo" class="fab fa-markdown"></i> Markdown Previewer</h1>
        </header>
        <div id='input' className='textWindow' style={{ display: (this.state.smallScreen ? this.state.displayEditor ? 'block' : 'none' : 'block') }}>
          <div class='grid-container'>
            <Toolbar
              text="Editor" />
            <Editor markdown={this.state.markdown}
              onChange={this.handleChange} />
          </div>
        </div>
        <div id='output' className='textWindow' style={{ display: (this.state.smallScreen ? this.state.displayEditor ? 'none' : 'block' : 'block') }}>
          <div class='grid-container'>
            <Toolbar
              text="Preview" />
            <Preview markdown={this.state.markdown} />
          </div>
        </div>
        <div id='switch'>
          <button id='switch-button' onClick={this.toggleView}><h2><i class="fas fa-exchange-alt"></i></h2></button>
        </div>
        <footer>
          Footer text here.
        </footer>
      </div >
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      {props.text}
    </div>
  )
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
