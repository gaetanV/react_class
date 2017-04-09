import React from 'react';
import PropTypes from 'prop-types';
import PanelY_Dom from 'dom/PanelY_Dom';
import PanelYContainer_Dom from 'dom/PanelYContainer_Dom';
import PanelY_Interface from 'interface/PanelY_Interface';

class PanelY extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false};
        this.Container = false;
        this.Panel = false;
        this.ping = [];
        if(props.interface){
            this.interface = props.interface;
            props.interface.extend(this);
        }
     }
    componentDidMount() {
        this.Container = new PanelYContainer_Dom(this.refs.Main);
        this.Panel = new PanelY_Dom(this.refs.Panel);
        this.Panel.dom.touchevent("resizeY", this.refreshDom.bind(this));
        this.Panel.dom.touchevent('touchY', () => {
            this.Panel.move().then( (index) => {
               this.panel(index);
            });
        });
        this.refreshDom();
        this.panel(0);
    }
    refreshDom() {
        this.Container.updateSize(); 
        this.Panel.updateSize(); 
        this.Panel.setActive(this.state.active);
    }
    panel(index) {
        var tempIndex = this.state.active;
        this.state.active = this.Panel.setActive(index);
        if( tempIndex !== this.state.active){
            if(this.ping[tempIndex]){
                this.ping[tempIndex](false);
            }
            this.pingMe(true);
        }
    }
    pingMe(bool){
        if(this.ping[this.state.active]){
           this.ping[this.state.active](bool);
        }
    }
    render() {
        return (
            <div ref="Main">
                <section ref="Panel" className="PanelContenair" >  
                    {this.props.collection.map(
                            (Result,i) => {
                                return (
                                    <div key={i} className={"panelY "+Result.displayName}>
                                         <div  ref={"panel"+i} className="panelScroll" ><Result pong={(func)=>{this.ping[i]=func}} /></div>
                                    </div>
                                )
                            }
                    )} 
                </section>
            </div>
        );
    }
};

PanelY.propTypes = {
    interface: function(props,propName){
        if(props[propName]){
             if(props[propName] instanceof PanelY_Interface === false){return new Error ("error interface violation injector");}
        }
    },
    collection:  PropTypes.arrayOf( function(props,propName){
            if(!React.Component.isPrototypeOf(props[propName])){return new Error ("error violation collection  is not a Component");}
    }),
};

export default PanelY;     