import React, { Component } from 'react';
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Body from "./components/Body";
import ContentCreate from "./components/ContentCreate";
import ContentUpdate from "./components/ContentUpdate";
import './App.css';






class App extends Component{
  constructor(props){  // 컴포넌트가 실행되면 젤 먼저 실행    초기화를 담당
    super(props);
    this.last_content_id=3;
    this.state = {
      mode:'read',
      selected_content_id:1,
      contents:[
        {id:1, title:'HTML', desc:'HTML is for infomation'},
        {id:2, title:'CSS', desc:'CSS is for infomation'},
        {id:3, title:'JavaScript', desc:'Javascript is for infomation'},
      ]
    }
  }
  debugger;
  getSelectedContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(this.state.selected_content_id === data.id){
        return data;
      }
      i = i + 1;
    }
  }
  getContentComponent(){
    if(this.state.mode === 'read'){
      return <Body data={this.getSelectedContent()}></Body>
    } else if(this.state.mode === 'welcome'){
      return <Body data={{
        title:"main",
        desc:'Hello',
      }}></Body>
    } else if(this.state.mode === 'create'){
      return <ContentCreate onSubmit={function(formData){
        console.log(formData)
        this.last_content_id = this.last_content_id + 1;
        formData.id = this.last_content_id;
        var newContents = Object.assign([], this.state.contents);
        newContents.push(formData);
        this.setState({
          contents:newContents,
          selected_content_id:this.last_content_id,
          mode:'read'

          });
      }.bind(this)}></ContentCreate>
    } else if(this.state.mode === 'update'){
      return <ContentUpdate data={this.getSelectedContent()}
      
      ></ContentUpdate>
    }
  }
  getControlComponent(){
    return [
      <a key="1" href="/create" onClick={function(e){
        e.preventDefault();
        this.setState({mode:'create'})
      }.bind(this)}>create </a>,
      <a key="2" href="/update" onClick={function(e){
        e.preventDefault();
        this.setState({mode:'update'})
      }.bind(this)}>update </a>,
      <input key="3" type="button" href="/delete" onClick={function(){
        var newContents = this.state.contents.filter(function(el){
          if(el.id !== this.state.selected_content_id){
            return el;
          }
        }.bind(this));
        this.setState({
          contents:newContents,
          mode:'welcome'
        });

      }.bind(this)} value="delete"></input>
    ];
  }
  render(){
    return (
      <div className="App">
        <Header onClick={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}
          title="Web"></Header>
        <Navigation onSelect={function(id){
          this.setState({selected_content_id:id});
          // this.state.selected_content_id의 값을 id로 바꿔라
        }.bind(this)}
        data={this.state.contents}></Navigation>
        {this.getControlComponent()}
        {this.getContentComponent()}
      </div>
    )
  }
}

export default App;
