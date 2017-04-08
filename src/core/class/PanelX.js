import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PanelX_Dom from 'dom/PanelX_Dom';
import PropTypes from 'prop-types';
import PanelX_Interface from 'interface/PanelX_Interface';


class PanelX extends React.Component {
    constructor(props) {
         super(props);
         this.interface = false;
         if(props.interface){
             this.interface = props.interface;
             props.interface.extend(this);
         }
         this.Panel = false;
         this.state = { active: 0 };
         this.ping = [];
     }
    componentDidMount() {
        this.Panel = new PanelX_Dom(ReactDOM.findDOMNode(this.refs.Panel));
        $(ReactDOM.findDOMNode(this.refs.Main)).css({ overflow: "hidden", position: "absolute", });
        this.Panel.dom.touchevent('touchX', () => {
            this.Panel.move().then( (index) => {
                this.panel(index);
            })
        });
        this.Panel.dom.touchevent("resizeX", this.refreshDom.bind(this));
        this.refreshDom();
        this.panel(this.state.active); 
    }
    refreshDom(){
        var dom = $(ReactDOM.findDOMNode(this.refs.Main)).parent();
        $(ReactDOM.findDOMNode(this.refs.Main)).css({width: dom.outerWidth()!==0?dom.outerWidth():"100%",height:dom.outerHeight()!==0?dom.outerHeight():"100%",});
        this.Panel.updateSize(); 
        this.Panel.setActive(this.state.active);
    }
    panel(index) {
        this.state.active = this.Panel.setActive(index);
        if(this.interface){
             this.interface.menu(this.state.active);
        }
        if(this.ping[this.state.active]){
            this.ping[this.state.active]();
        }
    }
    render() {
        return (
            <div ref="Main">
                <section ref="Panel" className="PanelContenair" >  
                    {this.props.collection.map((Result,i) => {return (<div  key={i} className={"panelX bloc"+i}><Result pong={(func)=>{this.ping[i]=func}} /></div>)})}   
                </section>
            </div>
        );
     }
};

PanelX.propTypes = {
    interface: function(props,propName){
        if(props[propName]){
             if(props[propName] instanceof PanelX_Interface === false){return new Error ("error interface violation injector");}
        }
    },
    collection:  PropTypes.arrayOf( function(props,propName){
            if(!React.Component.isPrototypeOf(props[propName])){return new Error ("error violation collection  is not a Component");}
    }),
};

export default PanelX;        