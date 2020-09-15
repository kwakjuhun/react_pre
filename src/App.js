import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Navigation extends Component{
  render(){
    return(
      <nav>
        <ol>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
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
        <h2>{this.props.id}</h2>
        {this.props.title}
        {this.props.desc}
      </article>
    )
  }
}
class App extends Component{
  state = {
    contents:[
      {id:1, title:'HTML', desc:'HTML is for infomation'},
      {id:2, title:'CSS', desc:'CSS is for infomation'},
      {id:3, title:'JavaScript', desc:'Javascript is for infomation'},
    ]
  }
  render(){
    return (
      <div className="App">
        <Header title="Web"></Header>
        <Body data={this.state.contents}></Body>
        <Navigation></Navigation>
      </div>
      
    )
  }
}

export default App;
