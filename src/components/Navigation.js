import React, { Component } from 'react';

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

export default Navigation;