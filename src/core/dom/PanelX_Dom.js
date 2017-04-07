import $ from 'jquery';
import DOM from 'DOM';

class PanelX_Dom {
    constructor(dom){
        this.dom = DOM($(dom));
     
        this.panelWidth = 0;
        this.dom.css({
            transition: "all 0.5s ease-out","-webkit-transition": "all 0.5s ease-out",
            position: "absolute",
            overflow: "hidden",
            height: "100%",
        });
        this.collection = [];
        this.dom.find(".panelX").map((i,val)=>{
             this.collection.push($(val));
        })
        this.calc();
    }
    length(){
        return this.collection.length;
    }
    calc(){
        this.dom.css({ width: this.length() * 100 + "%"});
        this.collection.map((val)=>{ 
            val.css({width: 100 / this.length() + "%","overflow-y": "hidden", float: "left", cursor: "grab", height: "100%"});
        })
    }
    updateSize(){
        this.panelWidth = this.dom.outerWidth() / this.length();
    }
    setActive(active){
        active>=this.length()&& (active=this.length()-1);
        active<0&&(active=0);
        this.dom.css({left: -this.panelWidth  * active + "px"});
        return active;
    }
    move(){
        return new Promise((resolve) => {
              
            this.dom.move("x", 1, (dom) => {
             
                var cran = dom.vitesse.x > 3? 
                    dom.pos.start.x - dom.pos.end.x > 0 ?
                        Math.ceil((-dom.pos.end.x) / this.panelWidth) 
                        : Math.floor((-dom.pos.end.x) / this.panelWidth)
                    :Math.round((-dom.pos.end.x) / this.panelWidth);
                resolve(
                    cran < 0 || cran > this.length() - 1?
                    cran = cran < 0 ? 0 : this.length() - 1
                    :cran
                );
            });
        });
    }
}

export default PanelX_Dom;    