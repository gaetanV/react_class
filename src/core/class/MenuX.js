import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import PanelX_Interface from 'interface/PanelX_Interface';

class MenuX extends React.Component {
    constructor(props) {
         super(props);
         this.interface = this.props.interface;
         this.props.interface.extend(this);
         this.state = { active: 0 };
     }
    componentDidMount() {  
        $(ReactDOM.findDOMNode(this.refs.Menu)).find("div").css({width: 100 / this.props.collection.length + "%", float: "left"});
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
                {this.props.collection.map((Result,i) => {return(<div  ref={"menu"+i} key={i} onClick={() => this.panel(i)}>{Result}</div>)})}
            </nav> 
        );
     }
};

MenuX.propTypes = {
    interface: function(props,propName){
       if(props[propName] instanceof PanelX_Interface === false){return new Error ("error interface violation injector");}
    },
    collection:  PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
export default MenuX;        