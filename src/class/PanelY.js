import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DOM from 'class/DOM';

const PanelY = React.createClass({
    getInitialState: function () {
        return {animate: false, nbPanel: 0, active: false, panel: [], panelHeight: 0, Panel: "", scroll: false};
    },
    componentDidMount: function () {
        var count = this.props.object.length;

        this.state.Panel = $(ReactDOM.findDOMNode(this.refs.Panel));
        $(ReactDOM.findDOMNode(this.refs.Main)).css({
            overflow: "hidden",
            height: window.innerHeight + "px",
            width: "100%",
            position: "relative",
        });
        this.state.Panel.css({
            height: count * 100 + "%",
            transition: "all 0.5s ease-out", "-webkit-transition": "all 0.5s ease-out",
            position: "absolute",
            overflow: "hidden",
            width: "100%",
        });
        this.state.nbPanel = count;
        this.state.active = 0;
        this.state.Panel.find(".panelY").css({"overflow-y": "hidden", cursor: "grab", height: window.innerHeight + "px", width: "100%"});
        this.state.panelHeight = this.state.Panel.outerHeight() / this.state.nbPanel;
        this.refs.Panel.touchevent('touchY', this.moveY);

    },
    refreshDom: function () {

    },
    panel: function (index) {
        var panelHeight = this.state.panelHeight;
        this.state.Panel.css({top: -panelHeight * index + "px"});
        this.state.active = index;

    },
    moveY: function () {
        var callback = function (dom) {
            var panelHeight = this.state.panelHeight;
            var cran = 0;
            if (dom.vitesse.y > 3) {
                cran = dom.pos.start.y - dom.pos.end.y > 0 ? Math.ceil((-dom.pos.end.y) / panelHeight) : Math.floor((-dom.pos.end.y) / panelHeight);
            } else {
                cran = Math.round((-dom.pos.end.y) / panelHeight);
            }
            if (cran < 0 || cran > this.state.nbPanel - 1) {
                cran = cran < 0 ? 0 : this.state.nbPanel - 1;
            }
            this.panel(cran);
            this.state.animate = false;
        }
        var cible = $(this.state.Panel);
        cible.move("y", 1, callback.bind(this));
    },
     render: function() {
        return (
            <div ref="Main">
                <section ref="Panel" className="PanelContenair" >  
                    {this.props.object.map(
                            function(Result,i){
                                return (
                                    <div key={i} className={"panelY "+Result.element.displayName}>
                                         <div  ref={"panel"+i} className="panelScroll" ><Result.element/></div>
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