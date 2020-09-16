import React, { Component } from 'react';
import './App.css';

class Navigation extends Component{
  render(){
    var list = [];
    var i = 0;
    while(i < this.props.data.length){
      var data = this.props.data[i];
      list.push(
        <li key={data.id}>
          <a href={data.id+'.html'} onClick={function(id, e){
            e.preventDefault(); // 페이지 전환 막기
            this.props.onSelect(id);
          }.bind(this, data.id)}>
            {data.title}
          </a>
        </li>)
      i = i + 1;
    }
    return(
      <nav>
        <ol>
          {list}
        </ol>
      </nav>
    )
  }
}
class Header extends Component{
  render(){
    return(
      <header>
        <h1>{this.props.title}</h1>
        World wide web
      </header>
    )
  }
}
class Body extends Component{
  render(){
    return(
      <article>
        <h2>{this.props.data.title}</h2>
        {this.props.data.desc}
      </article>
    )
  }
}
class ContentCreate extends Component{
  state = {
    title:'',
    desc:''
  }
  changeFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
          // name에 따라 값이 달라짐
  }
  render(){
    return (
      <article>
        <form onSubmit={function(e){
          e.preventDefault();
          this.props.onSubmit(this.state);
        }.bind(this)}>
          <p><input type="text" placeholder="title" name="title"
           value={this.state.title} onChange={this.changeFormHandler.bind(this)}></input></p>
          <p><textarea placeholder="description" name="desc"
           value={this.state.desc} onChange={this.changeFormHandler.bind(this)}></textarea></p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    )
  }

}
class App extends Component{
  last_content_id=3;
  state = {
    mode:'read',
    selected_content_id:1,
    contents:[
      {id:1, title:'HTML', desc:'HTML is for infomation'},
      {id:2, title:'CSS', desc:'CSS is for infomation'},
      {id:3, title:'JavaScript', desc:'Javascript is for infomation'},
    ]
  }
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
      }}>update </a>,
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
          console.log('App',id);
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
