import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DOM from 'class/DOM';
import PanelX_Interface from 'class/PanelX_Interface';


class PanelXDom {
    constructor(dom){
        this.dom = $(dom);
     
        this.panelWidth = 0;
        this.dom.css({
            height: "100%",
            position: "absolute",
            overflow: "hidden",
            transition: "all 0.5s ease-out",
            "-webkit-transition": "all 0.5s ease-out",
        });
        this.collection = [];
        this.dom.find(".panelX").map((i,val)=>{
             this.collection.push($(val));
        })
        this.calc();
    }
    length(){
        return this.collection.length;
    }
    calc(){
        this.dom.css({ width: this.length() * 100 + "%"});
        this.collection.map((val)=>{ 
            val.css({width: 100 / this.length() + "%","overflow-y": "hidden", float: "left", cursor: "grab", height: "100%"});
        })
    }
    updateSize(){
        this.panelWidth = this.dom.outerWidth() / this.length();
    }
    setActive(active){
        active>=this.length()&& (active=this.length()-1);
        active<0&&(active=0);
        this.dom.css({left: -this.panelWidth  * active + "px"});
        return active;
    }
    move(){
        return new Promise((resolve) => {
   
             this.dom.move("x", 1, (dom) => {
              var cran = dom.vitesse.x > 3? 
                    dom.pos.start.x - dom.pos.end.x > 0 ?
                        Math.ceil((-dom.pos.end.x) / this.panelWidth) 
                        : Math.floor((-dom.pos.end.x) / this.panelWidth)
                    :Math.round((-dom.pos.end.x) / this.panelWidth);
                    resolve(
                        cran < 0 || cran > this.length() - 1?
                            cran = cran < 0 ? 0 : this.length() - 1
                            :cran
                    );
            
            });
        });
    }
}

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
        this.Panel = new PanelXDom(ReactDOM.findDOMNode(this.refs.Panel));
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