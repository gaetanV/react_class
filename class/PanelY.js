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
                 transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out",
                position: "absolute",
                overflow:"hidden",
                width:"100%",
            });
             this.state.nbPanel=count;
            this.state.active=0;
              this.state.Panel.find(".panelY").css({"overflow-y": "hidden",cursor:"grab",height:window.innerHeight+"px",width:"100%"}); 
              this.state.panelHeight=this.state.Panel.outerHeight()/this.state.nbPanel;
              
              this.refs.Panel.touchevent('touchY', this.moveY);
            
        },
        refreshDom:function(){
              
        },
        onmouseWheel:function(e){
          
        },
        panel:function(index){
           var vm=this;
            var panelHeight=vm.state.panelHeight;
            
   
            this.state.Panel.css({top: -panelHeight*index+"px"});
            vm.state.active=index;
 
        },
        moveY: function (){
                var vm=this;
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
                 cible.move("y",1,callback);
        },
   
        render: function() {
            return (
                <div ref="Main">
               
                    <section ref="Panel" className="PanelContenair" >  
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