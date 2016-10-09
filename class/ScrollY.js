(function() {
    'use strict';
    ScrollY = React.createClass({
        
        componentDidMount: function() {
            $(this.refs.Scroll).css({position: "relative",transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out"}); 
            
            this.refs.Scroll.touchevent('touchY', this.moveY);
        },
        
        moveY:function(){
             var cible=$(this.refs.Scroll);
            var cibleHeight=cible.outerHeight();
            var panelHeight=cible.parent().outerHeight();
           
            var vm=this;
            var callback=function (dom){
                       if(-dom.posEnd.y<0||-dom.posEnd.y>(cibleHeight-panelHeight)){
                       var x=0;
                       if(-dom.posEnd.y>0){ x=-cibleHeight+panelHeight;}
                               cible.css({top:x+"px"});
                       };                 
            }
         
            if(panelHeight<cibleHeight){
                this.refs.Scroll.move("y",1,callback);
            }
       
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
        render: function() {
            return (
                <div ref="Scroll">{this.props.children}  </div>
           );
        }
    });
})();    