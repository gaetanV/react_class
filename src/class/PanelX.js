import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DOM from 'class/DOM';

const PanelX = React.createClass({
    getInitialState: function () {
        return {animate: false, nbPanel: 0, active: false, panel: [], panelWidth: 0, Panel: "", scroll: false};
    },
    componentDidMount: function () {
        var count = this.props.object.length;
        this.state.Panel = $(ReactDOM.findDOMNode(this.refs.Panel));
        $(ReactDOM.findDOMNode(this.refs.Main)).css({
            overflow: "hidden",
            width: $(ReactDOM.findDOMNode(this.refs.Main)).parent().css("width"),
            height: "100%",
            position: "absolute",

        });
        this.state.Panel.css({
            height: "100%",
            position: "absolute",
            overflow: "hidden",
            width: count * 100 + "%",
            transition: "all 0.5s ease-out",
            "-webkit-transition": "all 0.5s ease-out",
        });
        this.refs.Panel.touchevent('touchX', this.moveX);
        this.state.Panel.find(".panelX").css({"overflow-y": "hidden", float: "left", cursor: "grab", height: "100%", width: 100 / count + "%"});
        $(ReactDOM.findDOMNode(this.refs.Menu)).find("div").css({width: 100 / count + "%", float: "left"});
        for (var i = 0; i < count; i++) {
            this.state.panel.push($(ReactDOM.findDOMNode(this.refs["panel" + i])));
        }
        this.state.nbPanel = count;
        this.state.active = 0;
        this.refreshDom();
        this.state.Panel.touchevent("resizeX", this.refreshDom);
        this.panel(0);
    },
    refreshDom: function () {
        $(ReactDOM.findDOMNode(this.refs.Main)).css({width: $(ReactDOM.findDOMNode(this.refs.Main)).parent().css("width")});
        this.state.panelWidth = this.state.Panel.outerWidth() / this.state.nbPanel;
        this.state.Panel.css({left: -this.state.panelWidth * this.state.active + "px"});
        this.forceUpdate();
    },
    panel: function (index) {
        var panelWidth = this.state.panelWidth;
        $(ReactDOM.findDOMNode(this.refs["menu" + this.state.active])).removeClass("active");
        $(ReactDOM.findDOMNode(this.refs["menu" + index])).addClass("active");
        this.state.Panel.css({left: -panelWidth * index + "px"});
        this.state.active = index;
        this.state.scroll = this.state.panel[index].outerHeight() > this.state.Panel.outerHeight() ? true : false;
    },
    moveX: function () {
        var callback = function (dom) {
            var panelWidth = this.state.panelWidth;
            var cran = 0;
            if (dom.vitesse.x > 3) {
                cran = dom.pos.start.x - dom.pos.end.x > 0 ? Math.ceil((-dom.pos.end.x) / panelWidth) : Math.floor((-dom.pos.end.x) / panelWidth);
            } else {
                cran = Math.round((-dom.pos.end.x) / panelWidth);
            }
            if (cran < 0 || cran > this.state.nbPanel - 1) {
                cran = cran < 0 ? 0 : this.state.nbPanel - 1;
            }
            this.panel(cran);
            this.state.animate = false;
        }
        this.state.Panel.move("x", 1, callback.bind(this));
    },
    render: function() {
        return (
            <div ref="Main">
                <nav  ref="Menu" className="menu">
                    <nav>
                    {this.props.object.map(
                        (Result,i) => {
                            return(<div  ref={"menu"+i} className={Result.element.displayName+"_menu"} key={i} onClick={() => this.panel(i)}>{Result.title}</div>)
                        }
                    )}
                   </nav>
                </nav> 
                <section ref="Panel" className="PanelContenair" >  
                    {this.props.object.map(
                            function(Result,i){
                                 return (<div  key={i} className={"panelX "+Result.element.displayName}><Result.element /></div>)
                            }
                    )}   
                </section>
            </div>
        );
     }
});

export default PanelX;        