import React from 'react';
import $ from 'jquery';
import DOM from 'DOM';
import PropTypes from 'prop-types';

class ScrollY extends React.Component {
    constructor(props) {
        super(props);
        this.scroll = false;
    }
    componentDidMount() {
        $(this.refs.Scroll).css({position: "relative", transition: "all 0.5s ease-out", "-webkit-transition": "all 0.5s ease-out"});
        this.scroll = DOM($(this.refs.Scroll));
        this.scroll.touchevent('scrollUp', this.scrollUp.bind(this));
        this.scroll.touchevent('scrollDown', this.scrollDown.bind(this));
        this.scroll.touchevent('touchY', this.moveY.bind(this));
    }
    moveY() {
        var cibleHeight = this.scroll.outerHeight();
        var panelHeight = this.scroll.parent().outerHeight();
        if (panelHeight < cibleHeight) {
            this.scroll.move("y", 1, (dom) => {
                if (-dom.pos.end.y < 0 || -dom.pos.end.y > (cibleHeight - panelHeight)) {
                    var x = 0;
                    -dom.pos.end.y > 0 && (x = -cibleHeight + panelHeight);
                    this.scroll.css({top: x + "px"});
                }
            });
        }
    }
    scrollDown() {
        var cibleHeight = this.scroll.outerHeight();
        var panelHeight = this.scroll.parent().outerHeight();
        var y = parseInt(this.scroll.css("top"));
        if (-y + this.props.cran < (cibleHeight - panelHeight)) {
            y -= this.props.cran;
        } else {
            y = -(cibleHeight - panelHeight);
        }
        this.scroll.css({top: y + "px"});
    }
    scrollUp() {
        var y = parseInt(this.scroll.css("top"));
        y > 0 && (y = 0);
        y < 0 && (y += this.props.cran);
        this.scroll.css({top: y + "px"});
    }
    render() {
        return (<div ref="Scroll">{this.props.children}</div>);
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