(function() {
    'use strict';
    ScrollY = React.createClass({
        
        componentDidMount: function() {
            $(this.refs.Scroll).css({position: "relative",transition:"all 0.5s ease-out","-webkit-transition":"all 0.5s ease-out"}); 
             this.refs.Scroll.touchevent('scrollUp', this.scrollUp);
              this.refs.Scroll.touchevent('scrollDown', this.scrollDown);
            this.refs.Scroll.touchevent('touchY', this.moveY);
        },
        
        moveY:function(){
             var cible=$(this.refs.Scroll);
            var cibleHeight=cible.outerHeight();
            var panelHeight=cible.parent().outerHeight();
           
            var vm=this;
            var callback=function (dom){
                       if(-dom.pos.end.y<0||-dom.pos.end.y>(cibleHeight-panelHeight)){
                       var x=0;
                       if(-dom.pos.end.y>0){ x=-cibleHeight+panelHeight;}
                               cible.css({top:x+"px"});
                       };                 
            }
         
            if(panelHeight<cibleHeight){
                this.refs.Scroll.move("y",1,callback);
            }
       
        },
        scrollDown:function(e){
             var cran=300;
             var cible=$(this.refs.Scroll);
            var cibleHeight=cible.outerHeight();
            var y=parseInt(cible.css("top"));
               if(-y+cran<(cibleHeight-cible.parent().outerHeight())){
                    y-=cran;
                }
                else{y=-(cibleHeight-cible.parent().outerHeight());}
                cible.css({top:y+"px"})
        },
         scrollUp:function(e){
          
            var cible=$(this.refs.Scroll);
    
            var y=parseInt(cible.css("top"));
            var cran=200;
           
                if(y<0){ 
                   
                    y+=cran; 
                    if(y>0){y=0;};
                }
        
             
          
            cible.css({top:y+"px"})
        },
        render: function() {
            return (
                <div ref="Scroll">{this.props.children}  </div>
           );
        }
    });
})();    