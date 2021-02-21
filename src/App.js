import './App.css';
import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      selected_content_id: 2,
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
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>
    }
    else if (this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.Contents.length){
        var data = this.state.Contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent />
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.Subject.title} 
          sub={this.state.Subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'})
          }.bind(this)}
        />
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)} data={this.state.Contents}/>
        <Control 
          onChangeMode={function(_mode){
            this.setState({
              mode: _mode
            })
          }.bind(this)}
        />
        {/* <ReadContent 
          title={_title}
          desc={_desc}
        /> */}
        {_article}
      </div>
    );
  }
}

export default App;
