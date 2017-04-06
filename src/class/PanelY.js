import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DOM from 'class/DOM';

const PanelY = React.createClass({
    getInitialState: function () {
        return {animate: false, nbPanel: 0, active: false, panel: [], panelHeight: 0, Panel: ""};
    },
    componentDidMount: function () {

        //SET
        this.state.nbPanel =  this.props.object.length;
        this.state.active = 0;
        this.state.Panel = $(ReactDOM.findDOMNode(this.refs.Panel));
        //CSS
        var dom = $(ReactDOM.findDOMNode(this.refs.Main)).parent();
        $(ReactDOM.findDOMNode(this.refs.Main)).css({
            overflow: "hidden",
            width: "100%",
            position: "relative",
            height:dom.outerHeight()!==0?dom.outerHeight():"100%",
        });
        this.state.Panel.css({
            height: this.state.nbPanel * 100 + "%",
            transition: "all 0.5s ease-out", "-webkit-transition": "all 0.5s ease-out",
            position: "absolute",
            overflow: "hidden",
            width: "100%",
            height:"100%",
        });
        this.state.Panel.find(".panelY").css({"overflow-y": "hidden", cursor: "grab", width: "100%"});
        //EVENTS
        this.refs.Panel.touchevent('touchY', this.moveY);
        this.state.Panel.touchevent("resizeY", this.refreshDom);   //BUG SYNC
        this.refreshDom();
      
    },
    refreshDom: function () {
        var dom = $(ReactDOM.findDOMNode(this.refs.Main)).parent();
       
        var val = dom.outerHeight()!==0?dom.outerHeight():"100%";
         console.log(val);
        $(ReactDOM.findDOMNode(this.refs.Main)).css({height:parseInt(val) *  this.state.nbPanel });
        this.state.panelHeight = parseInt(val)  ;  
        this.state.Panel.find(".panelY").css({height:val});
        this.panel(this.state.active);
        this.forceUpdate();
    },
    panel: function (index) {
        this.state.Panel.css({top: -this.state.panelHeight * index + "px"});
        this.state.active = index;
    },
    moveYup: function(dom){
        var cran = dom.vitesse.y > 3 ?
            dom.pos.start.y - dom.pos.end.y > 0 ?
                Math.ceil((-dom.pos.end.y) / this.state.panelHeight) 
                : Math.floor((-dom.pos.end.y) / this.state.panelHeight) 
            :Math.round((-dom.pos.end.y) / this.state.panelHeight);
            console.log(cran);
        this.panel(
            cran < 0 || cran > this.state.nbPanel - 1?
                cran = cran < 0 ? 0 : this.state.nbPanel - 1
                :cran
        );
        this.state.animate = false;
    },
    moveY: function () {
        $(this.state.Panel).move("y", 1, this.moveYup);
    },
     render: function() {
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
});
export default PanelY;     