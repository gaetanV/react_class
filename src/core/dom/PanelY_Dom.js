import $ from 'jquery';
import DOM from 'DOM';

class PanelY_Dom {
    constructor(dom){
        this.dom = $(dom);
     
        this.panelHeight = 0;
        this.dom.css({
            transition: "all 0.5s ease-out", "-webkit-transition": "all 0.5s ease-out",
            position: "absolute",
            overflow: "hidden",
            width: "100%",
        });
        this.collection = [];
        this.dom.find(".panelY").map((i,val)=>{
             this.collection.push($(val));
        })
        this.calc();      
    }
    length(){
        return this.collection.length;
    }
    calc(){
        this.dom.css({ height: this.length() * 100 + "%"});
        this.collection.map((val)=>{ 
            val.css({height: 100 / this.length() + "%", width: "100%"});
        })
    }
    updateSize(){
        this.panelHeight = this.dom.outerHeight() / this.length();
    }
    setActive(active){
        active>=this.length()&& (active=this.length()-1);
        active<0&&(active=0);
        this.dom.css({top: -this.panelHeight  * active + "px"});
        return active;
    }
    move(){
        return new Promise((resolve) => {
             this.dom.move("y", 1, (dom) => {
                var cran = dom.vitesse.y > 3 ?
                dom.pos.start.y - dom.pos.end.y > 0 ?
                    Math.ceil((-dom.pos.end.y) / this.panelHeight) 
                    : Math.floor((-dom.pos.end.y) / this.panelHeight) 
                :Math.round((-dom.pos.end.y) / this.panelHeight);
                resolve(
                     cran < 0 || cran > this.length() - 1?
                         cran = cran < 0 ? 0 : this.length() - 1
                         :cran
                 )
            });
        });
    }
}

export default PanelY_Dom;    