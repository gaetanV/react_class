import React from 'react';
import PropTypes from 'prop-types';
import ScrollY_Dom from 'dom/ScrollY_Dom';
import PanelXContainer_Dom from 'dom/PanelXContainer_Dom';

class ScrollY extends React.Component {
    constructor(props) {
        super(props);
        this.state = {position: 0};
        this.scroll = false;
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
            if (this.scroll.canScroll) {
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
    moveY(y) {
        this.state.position = this.scroll.moveY(y);
    }
    refreshDom() {
        this.Container.updateSize();
        this.state.position = this.scroll.updateSize();
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
};

export default ScrollY;   