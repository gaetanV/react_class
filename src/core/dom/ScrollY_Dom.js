import $ from 'jquery';
import DOM from 'DOM';

class ScrollY_Dom {
    constructor(dom) {
        this.dom = DOM($(dom));
        this.dom.css({position: "relative", top: 0, transition: "all 0.5s ease-out", "-webkit-transition": "all 0.5s ease-out"});
        this.canScroll = false;
        this.positionY = 0;
    }
    updateSize() {
        var cibleHeight = this.dom.outerHeight();
        var panelHeight = this.dom.parent().outerHeight();
        this.canScroll = panelHeight < cibleHeight ? true : false;
        if (!this.canScroll) {
            this.setPositionY(0);
        }
        this.limit = -(cibleHeight - panelHeight);
        return this.positionY;
    }
    move() {
        return new Promise((resolve, error) => {
            if (!this.canScroll) {
                error("scroll can't move")
            } else {
                this.dom.move("y", 1, (dom) => {
                    resolve(dom.pos.end.y);
                });
            }
        });
    }
    moveY(y) {
        if (this.canScroll) {
            var yDom = this.positionY;
            yDom = y + yDom;
            yDom > 0 && (yDom = 0);
            yDom < this.limit && (yDom = this.limit);
            this.setPositionY(yDom);
        }
        return this.positionY;
    }
    setPositionY(y) {
        this.positionY = y;
        this.dom.css({top: this.positionY + "px"});
        return this.positionY;
    }
}

export default ScrollY_Dom;    