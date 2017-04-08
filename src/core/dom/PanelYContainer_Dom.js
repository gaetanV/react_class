import $ from 'jquery';

class PanelYContainer_Dom {
    constructor(dom){
        this.dom = $(dom);
        this.dom.css({ overflow: "hidden", position: "absolute", });
    }
    updateSize(){
        var dom =  this.dom.parent();
        this.dom.css({height:dom.outerHeight()!==0?dom.outerHeight():"100%",width:dom.outerWidth()!==0?dom.outerWidth():"100%",});
    }
}

export default PanelYContainer_Dom;    