import './App.css';
import React, { Component } from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'welcome',
      welcome: {title: 'Welcome', desc: 'Hello, React!!!'},
      Subject: {title: 'WEB', sub:'World Wide Web!'},
      Content: {title: 'HTML', sub:'HTML is HyperText Markup Language'},
      Contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render () {
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if (this.state.mode === 'read') {
      _title = this.state.Contents[0].title;
      _desc = this.state.Contents[0].desc;
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.Subject.title} 
          sub={this.state.Subject.sub}
        />
        <TOC data={this.state.Contents}/>
        <Content 
          title={_title}
          desc={_desc}
        />
      </div>
    );
  }
}

export default App;
