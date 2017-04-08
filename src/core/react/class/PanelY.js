import React from 'react';
import PropTypes from 'prop-types';
import PanelY_Dom from 'dom/PanelY_Dom';
import PanelYContainer_Dom from 'dom/PanelYContainer_Dom';


class PanelY extends React.Component {
    constructor(props) {
         super(props);
         this.state = { active: 0};
         this.Container = false;
         this.Panel = false;
         this.ping = [];
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
    }
    refreshDom() {
        this.Container.updateSize(); 
        this.Panel.updateSize(); 
        this.Panel.setActive(this.state.active);
    }
    panel(index) {
        this.state.active = this.Panel.setActive(index);
        if(this.ping[this.state.active]){
            this.ping[this.state.active]();
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
    collection:  PropTypes.arrayOf( function(props,propName){
            if(!React.Component.isPrototypeOf(props[propName])){return new Error ("error violation collection  is not a Component");}
    }),
};

export default PanelY;     