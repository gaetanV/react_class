(function() {
    'use strict';
    Panel = React.createClass({
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
            });

            this.state.Panel.find(".panel").css({"overflow-y": "hidden",float:"left",cursor:"grab",height:"100%",width:100/count+"%"}); 
            this.state.Panel.find(".panelScroll").css({  position: "relative"}); 
          
             $(ReactDOM.findDOMNode(vm.refs.Menu)).find("div").css({width:100/count+"%",float:"left"}); 
            for(var i = 0 ; i<count ;i++){this.state.panel.push($(ReactDOM.findDOMNode(vm.refs["panel"+i]))); }
            this.state.nbPanel=count;
            this.state.active=0;
            this.refreshDom();
            DOM.onmousewheel("Panel",this.onmouseWheel);
            DOM.onresize("x","Panel",this.refreshDom);
            this.panel(0);
        },
        refreshDom:function(){
                $(ReactDOM.findDOMNode(this.refs.Main)).css({  width: $(ReactDOM.findDOMNode(this.refs.Main)).parent().css("width")});
                 this.state.panelWidth=this.state.Panel.outerWidth()/this.state.nbPanel;
                 this.state.Panel.css({transition:"none","-webkit-transition":"none",left: -this.state.panelWidth*this.state.active+"px"});
                 this.state.scroll=$(this.state.panel[this.state.active]).outerHeight()>this.state.Panel.outerHeight()?true:false;
                 if(!this.state.scroll){
                     $(this.state.panel[this.state.active]).css({transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out",top:"0px"})
                 }
                this.forceUpdate();
        },
        onmouseWheel:function(e){
          
            if(!this.state.scroll){return false;}
            var cible=this.state.panel[this.state.active];
     
            var cibleHeight=cible.outerHeight();
           
            var y=parseInt(cible.css("top"));
            var cran=200;
            if(!e){ 
                if(y<0){ 
                   
                    y+=cran; 
                    if(y>0){y=0;};
                }
            }
            else{
                if(-y+cran<(cibleHeight-this.state.Panel.outerHeight())){
                    y-=cran;
                }
                else{y=-(cibleHeight-this.state.Panel.outerHeight());}
            }
            this.state.panel[this.state.active].css({transition:"all 0.1s linear","-webkit-transition":"all 0.1s linear",top:y+"px"})
        },
        panel:function(index){
          
            var vm=this;
            var panelWidth=vm.state.panelWidth;
            
             $(ReactDOM.findDOMNode(vm.refs["menu"+vm.state.active])).removeClass("active");
             $(ReactDOM.findDOMNode(vm.refs["menu"+index])).addClass("active");
            this.state.Panel.css({transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out",left: -panelWidth*index+"px"});
            vm.state.active=index;
            
            vm.state.scroll=this.state.panel[index].outerHeight()>this.state.Panel.outerHeight()?true:false;
          
           
        },
        handleClick: function(e){
            if(!this.state.animate){
                this.state.animate=true;
                DOM.direction(e,function(movement){
                var direction=Math.abs(movement.x)>Math.abs(movement.y);
                direction?moveX():moveY();
            },function(){vm.state.animate=false;});}

            var vm=this;
            function moveX(){
                var callback=function (dom){
                    var panelWidth=vm.state.panelWidth;
                    var cran=0;
                    var cible=0;
                    if(dom.vitesse.x>3){
                        cran=dom.posStart.x-dom.posEnd.x>0?Math.ceil((-dom.posEnd.x)/panelWidth):Math.floor((-dom.posEnd.x)/panelWidth);
                    }else{
                        cran=Math.round((-dom.posEnd.x)/panelWidth);
                    }
                    if(cran<0||cran>vm.state.nbPanel-1){cran=cran<0?0:vm.state.nbPanel-1;}
                    vm.panel(cran);
                    vm.state.animate=false;
                }
                vm.state.Panel.css({transition:"none","-webkit-transition":"none"});
                DOM.move(vm.state.Panel,"x",1,callback);
            }
            function moveY(){
            
                 if(!vm.state.scroll){
                       vm.state.animate=false; 
                       return false;
                 }
                var callback=function (dom){
                   
                    var cibleHeight=cible.outerHeight();
                    var panelHeight=vm.state.Panel.outerHeight();
                
                    if(-dom.posEnd.y<0||-dom.posEnd.y>(cibleHeight-panelHeight)){
                    var x=0;
                    if(-dom.posEnd.y>0){ x=-cibleHeight+panelHeight;}
                    cible.css({transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out",top:x+"px"});
                    };
                    vm.state.animate=false;                
                }
                var cible=$(vm.state.panel[vm.state.active]);
                cible.css({transition:"all 0.1s linear","-webkit-transition":"all 0.1s linear"});
                DOM.move(cible,"y",2.5,callback);
            }
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
                    <section ref="Panel" className="PanelContenair" onMouseDown={(e) => this.handleClick(e)}>  
                        {this.props.object.map(function(Result,i){return (
                            <div   key={i} className={"panel "+Result.element.displayName}>
                                <div  ref={"panel"+i} className="panelScroll" ><Result.element />  </div>
                            </div>
                        )},this)}   
                    </section>
                </div>
            );
        }
    });
})();    