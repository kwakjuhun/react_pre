import React, { Component } from 'react';

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

export default Header;