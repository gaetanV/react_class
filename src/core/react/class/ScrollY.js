import React from 'react';
import PropTypes from 'prop-types';
import ScrollY_Dom from 'dom/ScrollY_Dom';
import PanelXContainer_Dom from 'dom/PanelXContainer_Dom';
import ScrollY_Interface from 'interface/ScrollY_Interface';

class ScrollY extends React.Component {
    constructor(props) {
        super(props);
        this.state = {position: 0 , canMove: 0};
        this.scroll = false;
        this.interface = false;
        if(props.interface){
            this.interface = props.interface;
            props.interface.extend(this);
        }
    }
    componentDidMount() {
        this.Container = new PanelXContainer_Dom(this.refs.Main);
        this.scroll = new ScrollY_Dom(this.refs.Scroll);
        this.scroll.dom.touchevent('scrollUp', () => {
            this.moveY(+this.props.cran);
        });
        this.scroll.dom.touchevent('scrollDown', () => {
            this.moveY(-this.props.cran);
        });
        this.scroll.dom.touchevent('touchY', () => {
            if (this.state.canMove) {
                this.scroll.move().then((y) => {
                    this.moveY(y);
                }).catch(function (err) {
                    console.log(err);
                });
            }
        });
        this.scroll.dom.touchevent('resizeY', this.refreshDom.bind(this));
        this.refreshDom();
    }
    resetY(){
        this.state.position = this.scroll.setPositionY(0);
    }
    moveY(y) {
        this.state.position = this.scroll.moveY(y);
    }
    refreshDom() {
        this.Container.updateSize();
        this.state.position = this.scroll.updateSize();
        this.state.canMove = this.scroll.canScroll;
    }
    render() {
        return (<div ref="Main"><div ref="Scroll">{this.props.children}</div></div>);
    }
}

ScrollY.defaultProps = {
    cran: 300,
};

ScrollY.propTypes = {
    cran: PropTypes.number,
    children: PropTypes.node.isRequired,
    interface: function(props,propName){
        if(props[propName]){
             if(props[propName] instanceof ScrollY_Interface === false){return new Error ("error interface violation injector");}
        }
    },
};

export default ScrollY;   