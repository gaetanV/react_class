import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PanelX_Interface from 'interface/PanelX_Interface';
import PanelX_Dom from 'dom/PanelX_Dom';

class PanelX extends React.Component {
    constructor(props) {
        
         super(props);
         
         if(props.interface instanceof PanelX_Interface === false){throw ("error violation injector");}
         props.interface.extend(this);
         this.interface = props.interface;
         this.Panel = false;
         this.state = { active: 0 };

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
        this.interface.menu(this.state.active);
    }
    render() {
        return (
            <div ref="Main">
                <section ref="Panel" className="PanelContenair" >  
                    {this.props.object.map((Result,i) => {return (<div  key={i} className={"panelX bloc"+i}><Result/></div>)})}   
                </section>
            </div>
        );
     }
};


export default PanelX;        