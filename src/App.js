import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

class HComponent extends Component{
    constructor(){
        super();
        this.state = {
            color:'#000'
        }
    }

    MouseOverEvet(){
        this.setState({
            color:'red'
        })
    }

    MouseOutEvet(){
        this.setState({
            color:'#000'
        })
    }

    render(){
        return (
            <div>
                <h3 onMouseOut={this.MouseOutEvet.bind(this)} onMouseOver={this.MouseOverEvet.bind(this)} style={{color:this.state.color}}>This Is PWA. Try to break the network and refresh.</h3>
            </div>
        )
    }
}

render(
    <div>
        <HComponent />
    </div>,
    document.getElementById("app")
);