import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DOM from 'class/DOM';


class PanelYDom {
    constructor(dom){
        this.dom = $(dom);
     
        this.panelHeight = 0;
        this.dom.css({
            transition: "all 0.5s ease-out", "-webkit-transition": "all 0.5s ease-out",
            position: "absolute",
            overflow: "hidden",
            width: "100%",
        });
        this.collection = [];
        this.dom.find(".panelY").map((i,val)=>{
             this.collection.push($(val));
        })
        this.calc();
        
    }
    calc(){
        this.dom.css({ height: this.length() * 100 + "%"});
        this.collection.map((val)=>{ 
            val.css({height: 100 / this.length() + "%", width: "100%"});
        })
    }
    length(){
        return this.collection.length;
    }
    updateSize(){
        this.panelHeight = this.dom.outerHeight() / this.length();
    }
    setActive(active){
        active>=this.length()&& (active=this.length()-1);
        active<0&&(active=0);
        this.dom.css({top: -this.panelHeight  * active + "px"});
        return active;
    }
    move(){
        return new Promise((resolve) => {
             this.dom.move("y", 1, (dom) => {
                   var cran = dom.vitesse.y > 3 ?
                dom.pos.start.y - dom.pos.end.y > 0 ?
                    Math.ceil((-dom.pos.end.y) / this.panelHeight) 
                    : Math.floor((-dom.pos.end.y) / this.panelHeight) 
                :Math.round((-dom.pos.end.y) / this.panelHeight);
                resolve(
                     cran < 0 || cran > this.length() - 1?
                         cran = cran < 0 ? 0 : this.length() - 1
                         :cran
                 )
            });
        });
    }
}


class PanelY extends React.Component {

    constructor(props) {
        
         super(props);
        
         this.state = {animate: false, nbPanel: 0, active: false, panel: [], panelHeight: 0, Panel: ""};

     }
    componentDidMount() {
         $(ReactDOM.findDOMNode(this.refs.Main)).css({ overflow: "hidden", position: "absolute", });
      
        this.Panel = new PanelYDom(ReactDOM.findDOMNode(this.refs.Panel));
        
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