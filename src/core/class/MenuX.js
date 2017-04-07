import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PanelX_Interface from 'interface/PanelX_Interface';

class MenuX extends React.Component {
    constructor(props) {
        
         super(props);
         
         this.interface = false;
         this.state = { active: 0 };

     }
    componentDidMount() {  
        if(this.props.interface instanceof PanelX_Interface === false){throw ("error violation injector");}
        this.props.interface.extend(this);
        this.interface = this.props.interface;
        $(ReactDOM.findDOMNode(this.refs.Menu)).find("div").css({width: 100 / this.props.object.length + "%", float: "left"});
    }
    panel(index) {
        this.interface.panel(index); 
    }
    menu(index){
        $(ReactDOM.findDOMNode(this.refs["menu" + this.state.active])).removeClass("active");
        $(ReactDOM.findDOMNode(this.refs["menu" + index])).addClass("active");
         this.state.active = index;
    }
    render() {
        return (
            <nav  ref="Menu" className="menu">
                {this.props.object.map((Result,i) => {return(<div  ref={"menu"+i} key={i} onClick={() => this.panel(i)}>{Result}</div>)})}
            </nav> 
        );
     }
};

export default MenuX;        