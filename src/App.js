import './App.css';
import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props){
    super(props);
    this.max_contents_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id: 2,
      welcome: {title: 'Welcome', desc: 'Hello, React!!!'},
      Subject: {title: 'WEB', sub:'World Wide Web!'},
      //Content: {title: 'HTML', sub:'HTML is HyperText Markup Language'},
      Contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent () {
    var i = 0;
      while(i < this.state.Contents.length){
        var data = this.state.Contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }
  getContent () {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>
    }
    else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title = {_content.title} desc = {_content.desc}></ReadContent>
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_contents_id = this.max_contents_id + 1;
        // this.state.Contents.push( ---> 직접적으로 값을 변경하기 때문에 추후 업데이트 하는 과정에서 문제가 발생할 수 있음
        //   {id: this.max_contents_id, title: _title, desc: _desc}
        // )
        var _contents = Array.from(this.state.Contents);
        _contents.push({id: this.max_contents_id, title: _title, desc: _desc});
        this.setState({
          Contents: _contents,
          mode: 'read',
          selected_content_id: this.max_contents_id
        });
      }.bind(this)}/>
    }
    else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.Contents); //--> array를 통해 좀 더 융통성있게 정보 관리
        var i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id: _id, title: _title, desc: _desc}
            break;
          }
          i = i + 1;
        }
        this.setState({
          Contents: _contents,
          mode: 'read'
        });
      }.bind(this)}/>
    }

    return _article;
  }
  render () {
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
            if(_mode === 'delete') {
              if(window.confirm('really?')) {
                var _contents = Array.from(this.state.Contents);
                var i = 0;
                while(i < this.state.Contents.length) {
                  if(_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: 'welcome',
                  Contents: _contents
                });
                alert('deleted!!')
              }
            }
            else {
              this.setState({
                mode: _mode
              })
            }
            
          }.bind(this)}
        />
        {/* <ReadContent 
          title={_title}
          desc={_desc}
        /> */}
        {this.getContent()}
      </div>
    );
  }
}

export default App;
