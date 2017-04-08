import React from 'react';
import PropTypes from 'prop-types';
import PanelX_Dom from 'dom/PanelX_Dom';
import PanelXContainer_Dom from 'dom/PanelXContainer_Dom';
import PanelX_Interface from 'interface/PanelX_Interface';

class PanelX extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: 0 };
        this.interface = false;
        this.Panel = false;
        this.Container = false;
        this.ping = [];
        if(props.interface){
            this.interface = props.interface;
            props.interface.extend(this);
        }
     }
    componentDidMount() {
        this.Panel = new PanelX_Dom(this.refs.Panel);
        this.Container = new PanelXContainer_Dom(this.refs.Main);
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
        this.Container.updateSize(); 
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