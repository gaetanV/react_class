(function() {
    'use strict';
    PanelY = React.createClass({
        getInitialState: function() {return {animate:false,nbPanel:0,active:false,panel:[],panelHeight:0,Panel,scroll:false};},
        componentDidMount: function() {
             var vm=this,count=this.props.object.length;
            this.state.Panel=$(ReactDOM.findDOMNode(vm.refs.Panel));
            $(ReactDOM.findDOMNode(vm.refs.Main)).css({
                 overflow:"hidden",
                 height:  window.innerHeight+"px",
                  width: "100%",
                
                 position: "relative",
      
            });
            //////// BUG CSS HEIGHT REZISE
            this.state.Panel.css({
                 height: count*100+"%",
                 
                position: "absolute",
                overflow:"hidden",
                width:"100%",
            });
             this.state.nbPanel=count;
            this.state.active=0;
              this.state.Panel.find(".panelY").css({"overflow-y": "hidden",cursor:"grab",height:window.innerHeight+"px",width:"100%"}); 
              this.state.panelHeight=this.state.Panel.outerHeight()/this.state.nbPanel;
            
        },
        refreshDom:function(){
              
        },
        onmouseWheel:function(e){
          
        },
        panel:function(index){
           var vm=this;
            var panelHeight=vm.state.panelHeight;
            
   
            this.state.Panel.css({transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out",top: -panelHeight*index+"px"});
            vm.state.active=index;
            
          
          
           
        },
        handleClick: function(e){
            var vm=this;
             if(!this.state.animate){
               
                this.state.animate=true;
                DOM.findYourWay(e,function(movement){
                     
                var direction=Math.abs(movement.x)>Math.abs(movement.y);
                 
                direction?moveX():moveY();
            },function(){vm.state.animate=false;});}

            
            
            function moveY(){
                var callback=function (dom){
                    
                   var panelHeight=vm.state.panelHeight;
                 
                    var cran=0;
                    var cible=0;
                    if(dom.vitesse.y>3){
                        cran=dom.posStart.y-dom.posEnd.y>0?Math.ceil((-dom.posEnd.y)/panelHeight):Math.floor((-dom.posEnd.y)/panelHeight);
                    }else{
                        cran=Math.round((-dom.posEnd.y)/panelHeight);
                    }
                    if(cran<0||cran>vm.state.nbPanel-1){cran=cran<0?0:vm.state.nbPanel-1;}
            
                    vm.panel(cran);
                    vm.state.animate=false;
                
                }
                
                
                 var cible=$(vm.state.Panel);
                 vm.state.Panel.css({transition:"none","-webkit-transition":"none"});
                 DOM.move(cible,"y",1,callback);
               
            
            }
            function moveX(){
                 vm.state.animate=false;
            }
        },
        render: function() {
            return (
                <div ref="Main">
               
                    <section ref="Panel" className="PanelContenair" onMouseDown={(e) => this.handleClick(e)}>  
                        {this.props.object.map(function(Result,i){return (
                            <div   key={i} className={"panelY "+Result.element.displayName}>
                                <div  ref={"panel"+i} className="panelScroll" ><Result.element />  </div>
                            </div>
                        )},this)}   
                    </section>
                </div>
            );
        }
    });
})();    