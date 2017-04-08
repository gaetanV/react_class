import $ from 'jquery';

class PanelXContainer_Dom {
    constructor(dom){
        this.dom = $(dom);
        this.dom.css({ overflow: "hidden", position: "absolute", });
    }
    updateSize(){
        var dom =  this.dom.parent();
        this.dom.css({width: dom.outerWidth()!==0?dom.outerWidth():"100%",height:dom.outerHeight()!==0?dom.outerHeight():"100%",});
    }
}

export default PanelXContainer_Dom;    