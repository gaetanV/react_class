(function() {
    'use strict';
    PanelX = React.createClass({
        getInitialState: function() {return {animate:false,nbPanel:0,active:false,panel:[],panelWidth:0,Panel,scroll:false};},
        componentDidMount: function() {
            var vm=this,count=this.props.object.length;
            this.state.Panel=$(ReactDOM.findDOMNode(vm.refs.Panel));
            $(ReactDOM.findDOMNode(vm.refs.Main)).css({
                 overflow:"hidden",
                 width: $(ReactDOM.findDOMNode(vm.refs.Main)).parent().css("width"),
                 height:  "100%",
                 position: "absolute",
      
            });
            //////// BUG CSS HEIGHT REZISE
            this.state.Panel.css({
               height:  "100%",
                position: "absolute",
                overflow:"hidden",
                width:count*100+"%",
                transition:"all 0.5s ease-out",
                "-webkit-transition":"all 0.5s ease-out",
            });
            this.refs.Panel.touchevent('touchX', this.moveX);
            
             
           
           /*  
            this.state.Panel.find(".panelScroll").css({  position: "relative",transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out"}); 
            var r=this.state.Panel.find(".panelScroll");
             for(var i=0;i<r.length;i++){
                 r[i].touchevent('touchY', this.moveY);
             }
     
            */
            this.state.Panel.find(".panelX").css({"overflow-y": "hidden",float:"left",cursor:"grab",height:"100%",width:100/count+"%"}); 
           $(ReactDOM.findDOMNode(vm.refs.Menu)).find("div").css({width:100/count+"%",float:"left"}); 
            for(var i = 0 ; i<count ;i++){this.state.panel.push($(ReactDOM.findDOMNode(vm.refs["panel"+i]))); }
            this.state.nbPanel=count;
            this.state.active=0;
            this.refreshDom();
           
            DOM.onresize("x","Panel",this.refreshDom);
            this.panel(0);
        },
        refreshDom:function(){
                $(ReactDOM.findDOMNode(this.refs.Main)).css({  width: $(ReactDOM.findDOMNode(this.refs.Main)).parent().css("width")});
                 this.state.panelWidth=this.state.Panel.outerWidth()/this.state.nbPanel;
                 this.state.Panel.css({left: -this.state.panelWidth*this.state.active+"px"});
                /* this.state.scroll=$(this.state.panel[this.state.active]).outerHeight()>this.state.Panel.outerHeight()?true:false;
                 if(!this.state.scroll){
                     $(this.state.panel[this.state.active]).css({top:"0px"})
                 }*/
                this.forceUpdate();
        },
        panel:function(index){        
            var vm=this;
            var panelWidth=vm.state.panelWidth;
            $(ReactDOM.findDOMNode(vm.refs["menu"+vm.state.active])).removeClass("active");
            $(ReactDOM.findDOMNode(vm.refs["menu"+index])).addClass("active");
            this.state.Panel.css({left: -panelWidth*index+"px"});
            vm.state.active=index;
            vm.state.scroll=this.state.panel[index].outerHeight()>this.state.Panel.outerHeight()?true:false;
        },
        moveX:function(){

                var vm =this;
                var callback=function (dom){
                    var panelWidth=vm.state.panelWidth;
                    var cran=0;
                    var cible=0;
                    if(dom.vitesse.x>3){
                        cran=dom.posStart.x-dom.posEnd.x>0?Math.ceil((-dom.posEnd.x)/panelWidth):Math.floor((-dom.posEnd.x)/panelWidth);
                    }else{
                        cran=Math.round((-dom.posEnd.x)/panelWidth);
                    }
                    console.log(cran);
                    if(cran<0||cran>vm.state.nbPanel-1){cran=cran<0?0:vm.state.nbPanel-1;}
                    vm.panel(cran);
                    vm.state.animate=false;
                }
               
              this.state.Panel.move("x", 1, callback);

        },
   
        render: function() {
            return (
                <div ref="Main">
                    <nav  ref="Menu" className="menu">
                        <nav>
                            
                            {this.props.object.map(function(Result,i){return(
                                <div  ref={"menu"+i} className={Result.element.displayName+"_menu"} key={i} onClick={() => this.panel(i)}>{Result.title}</div>     
                            )},this)}
                            
                        </nav>
                    </nav> 
                    <section ref="Panel" className="PanelContenair" >  
                        {this.props.object.map(function(Result,i){return (
                            <div   key={i} className={"panelX "+Result.element.displayName}>
                                <Result.element />  
                            </div>
                        )},this)}   
                    </section>
                </div>
            );
        }
    });
})();    