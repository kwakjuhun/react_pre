import React, { Component } from 'react';

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

export default ContentCreate;