import React, { Component } from 'react';
import marked from 'marked';
import './stylesheet.css';

const mql = window.matchMedia(`(max-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: inputText,
      editorDisplayed: true,
      editorMaximised: false,
      previewerMaximised: false,
      smallScreen: mql.matches
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.toggleEditorMaximise = this.toggleEditorMaximise.bind(this);
    this.togglePreviewerMaximise = this.togglePreviewerMaximise.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
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

  handleTextUpdate(e) {
    this.setState({
      markdown: e.target.value
    });
  }

  toggleEditorMaximise() {
    this.setState({
      editorMaximised: !this.state.editorMaximised
    });
  }

  togglePreviewerMaximise() {
    this.setState({
      previewerMaximised: !this.state.previewerMaximised
    });
  }

  togglePreview() {
    this.setState({
      editorDisplayed: !this.state.editorDisplayed
    });
  }

  render() {
    const classes = this.state.smallScreen ?
      this.state.editorDisplayed ?
        ['pageWrapper',
          'textWindow displayBlock',
          'textWindow displayNone',
          ''] :
        ['pageWrapper',
          'textWindow displayNone',
          'textWindow displayBlock',
          ''] :
      this.state.editorMaximised ?
        ['pageWrapper grid-editor-maximised',
          'textWindow displayBlock',
          'textWindow displayNone',
          'fa fa-compress'] :
        this.state.previewerMaximised ?
          ['pageWrapper grid-previewer-maximised',
            'textWindow displayNone',
            'textWindow displayBlock',
            'fa fa-compress'] :
          ['pageWrapper grid-side-by-side',
            'textWindow displayBlock',
            'textWindow displayBlock',
            'fa fa-arrows-alt'];
    return (
      <div className={classes[0]}>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
        <header>
          <h1><i id="markdown-logo" class="fab fa-markdown"></i> Markdown Previewer</h1>
        </header>
        <div id='input' className={classes[1]}>
          <div class='grid-container'>
            <Toolbar
              icon={classes[3]}
              onClick={this.toggleEditorMaximise}
              text="Editor" />
            <Editor markdown={this.state.markdown}
              onChange={this.handleTextUpdate} />
          </div>
        </div>
        <div id='output' className={classes[2]}>
          <div class='grid-container'>
            <Toolbar
              icon={classes[3]}
              onClick={this.togglePreviewerMaximise}
              text="Preview" />
            <Preview markdown={this.state.markdown} />
          </div>
        </div>
        <button id='switch-button' onClick={this.togglePreview}><h2><i class="fas fa-exchange-alt"></i></h2></button>
        <footer>
          Made by <a href=" https://github.com/joldie/ " target="_blank ">joldie</a> as a project for the <a href="https://learn.freecodecamp.org/ " target="_blank ">freeCodeCamp</a> Front End Libraries course
        </footer>
      </div >
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      {props.text}
      <i onClick={props.onClick} className={props.icon}></i>
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
  `# Heading

  ## Sub-heading
  
  Paragraphs are separated
  by a blank line.
  
  Two spaces at the end of a line  
  produces a line break.
  
  Text attributes _italic_, 
  **bold**.
  
  Horizontal rule:
  
  ---
  
  Bullet list:
  
    * apples
    * oranges
    * pears
  
  Numbered list:
  
    1. wash
    2. rinse
    3. repeat
  
  A [link](http://example.com).
  
  Inline <abbr title="Hypertext Markup Language">HTML</abbr> is supported.
`

export default App;
