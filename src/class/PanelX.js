import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DOM from 'class/DOM';
import PanelX_Interface from 'class/PanelX_Interface';

const PanelX = React.createClass({
    getInitialState: function () {
        return {interface: false,animate: false, nbPanel: 0, active: false, panel: [], panelWidth: 0, Panel: "", scroll: false};
    },
    componentDidMount: function () {
    
        if(this.props.interface instanceof PanelX_Interface === false){throw ("error violation injector");}
        this.props.interface.extend(this);
        
         //SET
        this.state.nbPanel =  this.props.object.length; 
        this.state.interface = this.props.interface;
        this.state.Panel = $(ReactDOM.findDOMNode(this.refs.Panel));
        this.state.active = 0;
        for (var i = 0; i < this.state.nbPanel; i++) {
            this.state.panel.push($(ReactDOM.findDOMNode(this.refs["panel" + i])));
        }
        
        //CSS
  
        $(ReactDOM.findDOMNode(this.refs.Main)).css({
            overflow: "hidden",
            position: "absolute",
        });
 
        this.state.Panel.css({
            height: "100%",
            position: "absolute",
            overflow: "hidden",
            width: this.state.nbPanel * 100 + "%",
            transition: "all 0.5s ease-out",
            "-webkit-transition": "all 0.5s ease-out",
        });
        
        //EVENTS
        this.refs.Panel.touchevent('touchX', this.moveX);
        this.state.Panel.find(".panelX").css({"overflow-y": "hidden", float: "left", cursor: "grab", height: "100%", width: 100 / this.state.nbPanel + "%"});
        this.state.Panel.touchevent("resizeX", this.refreshDom);
       
        //INIT   
        this.refreshDom();
        this.panel(0);
    },
    refreshDom: function () {
        var dom = $(ReactDOM.findDOMNode(this.refs.Main)).parent();
        $(ReactDOM.findDOMNode(this.refs.Main)).css({
            width: dom.css("width"),
            height:dom.outerHeight()!==0?dom.outerHeight():"100%",
        });
        this.state.panelWidth = this.state.Panel.outerWidth() / this.state.nbPanel;
        this.state.Panel.css({left: -this.state.panelWidth * this.state.active + "px"});
        this.forceUpdate();
    },
    panel: function (index) {
        this.state.interface.menu(index);
        this.state.Panel.css({left: -this.state.panelWidth * index + "px"});
        this.state.active = index;
        this.state.scroll = this.state.panel[index].outerHeight() > this.state.Panel.outerHeight() ? true : false;
    },
    moveXup: function(dom){
             var cran = dom.vitesse.x > 3? 
                dom.pos.start.x - dom.pos.end.x > 0 ?
                    Math.ceil((-dom.pos.end.x) / this.state.panelWidth) 
                    : Math.floor((-dom.pos.end.x) / this.state.panelWidth)
                :Math.round((-dom.pos.end.x) / this.state.panelWidth);
            this.panel(
                    cran < 0 || cran > this.state.nbPanel - 1?
                        cran = cran < 0 ? 0 : this.state.nbPanel - 1
                        :cran
             );
            this.state.animate = false;
    },
    moveX: function () {
        this.state.Panel.move("x", 1, this.moveXup);
    },
    render: function() {
        return (
            <div ref="Main">
                <section ref="Panel" className="PanelContenair" >  
                    {this.props.object.map(
                            (Result,i) => {
                                 return (<div  key={i} className={"panelX "+Result.displayName}><Result/></div>)
                            }
                    )}   
                </section>
            </div>
        );
     }
});

export default PanelX;        