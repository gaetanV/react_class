import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PanelY_Dom from 'dom/PanelY_Dom';

class PanelY extends React.Component {
    constructor(props) {
         super(props);
         this.state = {animate: false, nbPanel: 0, active: false, panel: [], panelHeight: 0, Panel: ""};
     }
    componentDidMount() {
         $(ReactDOM.findDOMNode(this.refs.Main)).css({ overflow: "hidden", position: "absolute", });
      
        this.Panel = new PanelY_Dom(ReactDOM.findDOMNode(this.refs.Panel));
        
        this.Panel.dom.touchevent("resizeY", this.refreshDom.bind(this));
        this.Panel.dom.touchevent('touchY', () => {
            this.Panel.move().then( (index) => {
               this.panel(index);
            })
        });
        this.refreshDom();
 
    }
    refreshDom() {
        var dom = $(ReactDOM.findDOMNode(this.refs.Main)).parent();
        $(ReactDOM.findDOMNode(this.refs.Main)).css({height:dom.outerHeight()!==0?dom.outerHeight():"100%",width:dom.outerWidth()!==0?dom.outerWidth():"100%",});
        this.Panel.updateSize(); 
        this.Panel.setActive(this.state.active);
    }
    panel(index) {
        this.state.active = this.Panel.setActive(index);
    }
    render() {
        return (
            <div ref="Main">
                <section ref="Panel" className="PanelContenair" >  
                    {this.props.object.map(
                            (Result,i) => {
                                return (
                                    <div key={i} className={"panelY "+Result.displayName}>
                                         <div  ref={"panel"+i} className="panelScroll" ><Result/></div>
                                    </div>
                                )
                            }
                    )} 
                </section>
            </div>
        );
    }
};
export default PanelY;     