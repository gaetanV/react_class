var DOM;
(function() {
    'use strict';
   
             if (typeof jQuery !== 'undefined') {
                 
                jQuery.fn.extend({
                    touchevent:function(eventname,callback){
                        DOM.touchevent(eventname,this,callback);
                    },
                    move:function(direction,speed,callback){
                           DOM.move(this,direction,speed,callback);
                    }
                });
            }else{
                console.log("JQUERY IS NOT LOADED BUT DOMEVENT IS READY");
            }

            HTMLElement.prototype.touchevent=function(eventname,callback){
                        DOM.touchevent(eventname,this,callback);
            };
            HTMLElement.prototype.move=function(direction,speed,callback){
                        DOM.move(this,direction,speed,callback);
            };
    
    DOM=function(){
        
   
        
        var param={
           
            fps:30,
            timeLongclick:400,//@Time to determinate when is a longClick
            timeDbclick:200,
        }
        var mem={
            window:{x:window.innerWidth,y:window.innerHeight},

        }
      
        
        
        var getTime= function(){
            return performance.now();
           
        };
        var dom={
            move:false, 
            /* 
                @mousemove :  switch move [dragAndDrop,FindYourWay,longclick]
            */
            click:false,
            /* 
                @EVENT     : TOUCHEVENT.onlongclick
                @refresh   : Defined if move is longclick
            */
            dragAndDrop:false, 
            scroll:false,
            /*
                @EVENT     : TOUCHEVENT.dragAndDrop
                @mousemove : defined position
                @refresh:  : refresh css
            */
            resize:{x:[],y:[],xy:[]},
        }


      
        var TOUCHEVENT=function(){
            
            var newevent =function(e,name){
                return {
                    target:e.target,
                    timeStart:getTime(),
                    mouseStart:{x:TOOLS.touchPos(e).x,y:TOOLS.touchPos(e).y},
                    vitesse:{x:0,y:0},
                    origin:e.target,
                    mouseEnd:{x:TOOLS.touchPos(e).x,y:TOOLS.touchPos(e).y},
                    etat:name
                };
            };
            var domEvents={
                 
                   click : function (e){   
                        if(dom.click.etat==="waitclick"){
                            TOUCHEVENT.stopDbClick();
                         
                        }else{
                           dom.move="whereYouGo";
                           dom.click=newevent(e,"click");
                           setTimeout(function(){ TOUCHEVENT.startLongClick() ; }, param.timeLongclick);
                        }
                       

                   },
                   mousemove:function(e){
                         var d=dom.click;
  
                        if(Math.abs(TOOLS.touchPos(e).x-d.mouseStart.x)>4||Math.abs(e.clientY-d.mouseStart.y)>4){
                            
                            TOUCHEVENT.stopFindYourWay(e);
                         }
                   },
                   mouseup:function(e){      
                        if(dom.click.etat=="longclick"){
                                TOUCHEVENT.stopLongClick();
                        }
                        if(dom.click.etat=="click"){
                               var node=dom.click.target;
                               dom.click.etat="waitclick";
                               if(node.ref && typeof node.ref.dbclick==='function'){ 
                                
                                    setTimeout(function(){ TOUCHEVENT.stopClick() ; }, param.timeDbclick);
                               }else{
                                   TOUCHEVENT.stopClick() ;
                               }
                             
                        }
                   
                    
                  },
                  mousewheel:function(e){
                       dom.scroll=newevent(e,"scroll");
                       e.detail>0?TOUCHEVENT.stopScrollDown(): TOUCHEVENT.stopScrollUp();
                       if(dom.scroll.etat=="freeze"){
                           e.preventDefault();
                       }
                       dom.scroll=false;
                  }
            }
            var stopScrollUp=function(){
                  var parent=TOOLS.findParent(dom.scroll.target,"scrollUp");
                  if(parent){dom.scroll.target=parent;dom.scroll.etat="scrollUp";parent.ref.scrollUp(dom.scroll);dom.scroll.etat="freeze";}  
            };
             var stopScrollDown=function(){
                 var parent=TOOLS.findParent(dom.scroll.target,"scrollDown");
                 if(parent){dom.scroll.target=parent;dom.scroll.etat="scrollDown";parent.ref.scrollDown(dom.scroll);dom.scroll.etat="freeze";}
       
             }
             var stopDbClick=function(){
                    if(dom.click.etat==="waitclick"){
                        dom.click.etat="dbclick"
                        var node=dom.click.target;
                        if(node.ref && typeof node.ref.dbclick==='function'){ node.ref.dbclick(dom.click);}
                        dom.click=false;
                    }
                   
            }
            var stopClick=function(){
                if(dom.click.etat==="waitclick"){
                    dom.click.etat="clickup"
                    var node=dom.click.target;
                    if(node.ref && typeof node.ref.click==='function'){ node.ref.click(dom.click);}
                    dom.move=false;
                
                }
                dom.click=false;
             
            }
            var startLongClick =function(){
               if(dom.click&&dom.click.etat=="click"){
                    var node=dom.click.target;
                    dom.click.etat="longclick";
                    if(node.ref && typeof node.ref.longclick==='function'){
                        dom.move="longclick";
                        node.ref.longclick(dom.click); 
                    }
              }
            }
            var stopLongClick =function(){
                var node=dom.click.target;
                dom.click.etat="longclickup";
                dom.move=false;
                if(node.ref && typeof node.ref.longclickup==='function'){node.ref.longclickup(dom.click); }
                dom.click=false;
            } 

        
            var stopFindYourWay=function(e){
               var direction=Math.abs(TOOLS.touchPos(e).x-dom.click.mouseStart.x)>Math.abs(TOOLS.touchPos(e).y-dom.click.mouseStart.y);
               dom.move=false;
               if(direction){
                  
                           var parent=TOOLS.findParent(e.target,"touchX");
                           if(parent){parent.ref.touchX();}
               }
               else{
                           var parent=TOOLS.findParent(e.target,"touchY");
                           if(parent){parent.ref.touchY();}
                          
                }
               dom.click=false; 
               
            }
      
            var touchevent =function(eventname,e,callback){
                var affectEvent=function(e,event,callback){
                     if( typeof callback !=='function')throw("callback need to be a function");
                     e=TOOLS.jQueryToNatif(e);
                     if(!TOOLS.isInPage(e))throw("We can't register a event on a dom not in body");
                     if(!e.ref)e.ref={};
                     if( e.ref[event])throw("Event "+event+" is already defined");
                     e.ref[event]=callback;
                }
            
                switch(eventname){
                    default:
                        throw(eventname + "is not a known event try touchX or touchY");
                        break;
                    case "click":
                        affectEvent(e,"click",callback);
                        break;
                    case "longclick":
                        affectEvent(e,"longclick",callback);
                        break;
                    case "longclickup":
                         affectEvent(e,"longclickup",callback);
                         break;  
                    case "touchX":
                        affectEvent(e,"touchX",callback);
                         break;
                    case "touchY":
                        affectEvent(e,"touchY",callback);
                        break;
                    case "dbclick":
                        affectEvent(e,"dbclick",callback);
                        break;
                    case "scrollUp":
                        affectEvent(e,"scrollUp",callback);
                        break;
                    case "scrollDown":
                        affectEvent(e,"scrollDown",callback);
                        break;
                        
                }    
            }
            return{
                  click:domEvents.click,
                  mousemove:domEvents.mousemove,
                  refresh:domEvents.refresh,
                  mouseup:domEvents.mouseup,
                  mousewheel:domEvents.mousewheel,
                  stopDbClick:stopDbClick,
                  touchevent:touchevent,
                  stopClick:stopClick,
                  startLongClick:startLongClick,
                  stopLongClick:stopLongClick,
                  stopFindYourWay:stopFindYourWay,
                  
                  stopScrollDown:stopScrollDown,
                  stopScrollUp:stopScrollUp
                 
            } 
        }();
        
        var DOMEVENT=function(){     
            return {
                 onresize:function(space,id,callback){ if(dom.resize[space]){dom.resize[space][id]=callback;}},  
            }
        }();
        
         var DOMMOVE=function(){
             var domEvents={
                 refresh:function(){
              
                    var d=dom.dragAndDrop;
                    if(d.refresh){  
                            var pos=TOOLS.touchPos(d.refresh);
                            var x=0;//d.transPosStart.x;
                            var y=0;//d.transPosStart.y;
                            switch(d.way){  
                                case "-x":
                                    x+=(d.mouse.x-pos.x)*d.speed;  
                                    break;
                                case "x":
                                    x-=(d.mouse.x-pos.x)*d.speed;  
                                    break;
                                case "-y":
                                    y+=(d.mouse.y-pos.y)*d.speed;  
                                    break;
                                 case "y":
                                    y-=(d.mouse.y-pos.y)*d.speed;  
                                    break;
                                 case "xy":
                                    x-=(d.mouse.x-pos.x)*d.speed; 
                                    y-=(d.mouse.y-pos.y)*d.speed;  
                                    break;
                            }   
                          
                            d.transPosEnd={y:y,x:x};
                            d.dom.style.transform = "matrix("+d.css.matrix[0]+","+d.css.matrix[1]+","+d.css.matrix[2]+","+d.css.matrix[3]+", "+d.transPosEnd.x+", "+d.transPosEnd.y+")";
                            d.refresh=false;
                    }
                 },
                 mousemove:function(e){
                        var d=dom.dragAndDrop;
                        if(!d.mouse){
                             d.mouse=TOOLS.touchPos(e);
                        }
                       d.refresh=e;
                       
                 },
                 mouseup:function(e){
                      DOMMOVE.stopDragAndDrop();
                 }
             }
             var startDragAndDrop=function(domNode,way,speed,callback){
           
                     console.log("startDragAndDrop");
            
                dom.move="dragAndDrop";
              
  
                 domNode=TOOLS.jQueryToNatif(domNode);
                var transform = TOOLS.getTransform(domNode);
                
             
                dom.dragAndDrop&&(stopDragAndDrop());
                
                var computedStyle = window.getComputedStyle(domNode); 
       
               
            ;
                var matrix=[1,0,0,1,0,0];
                 var offset=TOOLS.getOffset(domNode);
                 
                 
                 var t=computedStyle.transform;
                    if(t!="none"){
                        var re = /\((.*)\)/
                        var pos = re.exec(computedStyle.transform);
                        matrix= pos[1].split(",");

                    }
               
                dom.dragAndDrop={
                    timeStart:getTime(),
                    timeEnd:getTime()+1,
                    dom:domNode,
                    speed:speed,
                    mouse:false,
                    css:{
                       matrix:matrix,
                       position:computedStyle.position,
                       transform:computedStyle.transform,
                       transitionDuration:computedStyle.transitionDuration,
                       transitionProperty:computedStyle.transitionProperty,
                       transitionDelay:computedStyle.transitionDelay,
                       top:computedStyle.top,
                       left:computedStyle.left,
                    },
                    posEnd:{x:offset.left,y:offset.top},
                    posStart:{x:offset.left,y:offset.top},
                    transPosStart:{x:transform.x ,y:transform.y  },
                    transPosEnd:{x:transform.x ,y:transform.y  },
                    way:way,
                    callback:callback,
                    refresh:false,
                };
                     
                 domNode.style.transition="none";
        
            }
       
            var stopDragAndDrop =function(){ 
                    console.log("stopDragAndDrop");
                dom.move=false;
                var domObj=dom.dragAndDrop;
    
                var computedStyle = window.getComputedStyle(domObj.dom); 
               var offset=TOOLS.getOffset(domObj.dom);
               if(computedStyle.position=="absolute"||computedStyle.position=="fixed"||computedStyle.position=="relative"){
       
                    domObj.dom.style.top=parseInt(domObj.css.top)+domObj.transPosEnd.y+"px";
                    domObj.dom.style.left=parseInt(domObj.css.left)+domObj.transPosEnd.x+"px";
                    
                }
                console.log( domObj.css.transform);
               // domObj.dom.style.transform = domObj.css.transform;
                var d=domObj;
                d.dom.style.transform = "matrix("+d.css.matrix[0]+","+d.css.matrix[1]+","+d.css.matrix[2]+","+d.css.matrix[3]+",0,0)";
                domObj.dom.style.transitionDuration = domObj.css.transitionDuration;
                 domObj.dom.style.transitionProperty = domObj.css.transitionProperty;
                 domObj.dom.style.transitionDelay = domObj.css.transitionDelay;
                domObj.posEnd={x:parseInt(domObj.css.left)+domObj.transPosEnd.x,y:parseInt(domObj.css.top)+domObj.transPosEnd.y};
                domObj.timeEnd=getTime(); 
                var time=domObj.timeEnd-domObj.timeStart;
                var x= Math.abs(domObj.posStart.x-domObj.posEnd.x);
                var y= Math.abs(domObj.posStart.y-domObj.posEnd.y);
                domObj.vitesse={x:1/(time*1/x),y:1/(time*1/y)}; 
                domObj.callback(domObj);
                dom.dragAndDrop=false;
            }
             
             return{
                 refresh:domEvents.refresh,
                 mousemove:domEvents.mousemove,
                 mouseup:domEvents.mouseup,
                 startDragAndDrop:startDragAndDrop,
                 stopDragAndDrop:stopDragAndDrop,
             }
             
         }();
         
         var TOOLS=function(){
              var touchPos =function(e){
                  if (e.targetTouches) {
                            if(e.targetTouches.length == 1){
                                  var touch = e.targetTouches[0];
                                  return{x:touch.pageX,y:touch.pageY};
                              }
                   }else{
                                 return{x:e.clientX,y:e.clientY};
                  }
              } 
              var findParent = function(n,param){
                          while(n!=null){
                              if(n.ref && typeof n.ref[param]==='function'){return n }
                              var n=n.parentNode;
                           }
                     return false;
              }
             
             
              var selection=function(boolean){
                       if(!boolean){
                                 var a=document.querySelector("*");
                                 a.style.MozUserSelect ="none";
                                 a.style.webkitUserSelect  ="none";
                                 a.style.oUserSelect  ="none";
                                 a.style.khtmlUserSelect  ="none";
                                 a.style.msUserSelect  ="none";
                                 a.style.userSelect  ="none";
                          
                      }else{
                                 var a=document.querySelector("*");
                                 a.style.MozUserSelect ="text";
                                 a.style.webkitUserSelect  ="text";
                                 a.style.oUserSelect  ="text";
                                 a.style.khtmlUserSelect  ="text";
                                 a.style.msUserSelect  ="text";
                                 a.style.userSelect  ="text";
                      }
             };
             
             var jQueryToNatif = function (node) {
                if(typeof jQuery !== 'undefined' && node instanceof jQuery){
                        return node[0];
                   }
                  return node;
             }

             
             var isInPage= function (node) {
                node=jQueryToNatif(node);
                if(node instanceof Node){
                   return (node === document.body) ? false : document.body.contains(node);

                }
                throw("Argument passed is not a node element");
                return false;

             }
            var getTransform=function(node){
                   var computedStyle = window.getComputedStyle(node); 
                    var transformX=0;
                    var transformY=0;
                     var t=computedStyle.transform;
                    if(t!="none"){
                        var re = /\((.*)\)/
    
                        var pos = re.exec(computedStyle.transform);
                        var matrix= pos[1].split(",");
                        transformX=parseInt(matrix[4]);
                        transformY=parseInt(matrix[5]);
                      
                     }
                     return  {x:transformX,y:transformY};
                     
            }
            var getOffset =function (node) {    
                    var e=jQueryToNatif(node);
                    var bc = e.getBoundingClientRect();
                    var computedStyle = window.getComputedStyle(node); 
                    var paddingTop=parseInt(computedStyle.paddingTop, 10);
                    var paddingBottom=parseInt(computedStyle.paddingBottom, 10);
                    var paddingLeft=parseInt(computedStyle.paddingLeft, 10);
                    var paddingRight=parseInt(computedStyle.paddingRight, 10);
                    var h = e.clientHeight;
                    var marginTop=parseInt(computedStyle.marginTop, 10);
                    var borderTop=parseInt(computedStyle.borderTopWidth, 10)
                    h += marginTop+borderTop;
                    h += parseInt(computedStyle.borderBottomWidth, 10);
                    h += parseInt(computedStyle.marginBottom, 10);
                    var w = e.clientWidth;
                    w += parseInt(computedStyle.marginRight, 10);
                    w += parseInt(computedStyle.borderRightWidth, 10);
                    var marginLeft=parseInt(computedStyle.marginLeft, 10);;
                    var borderLeft=parseInt(computedStyle.borderLeftWidth, 10);
                    w += borderLeft + marginLeft;
                  
                    /********************
                     * TO DO 
                     * ANGLE TRANSFORM
                     * SCALE TRANSFORM
                     */
            
                    return {
                        left: bc.left + window.scrollX-marginLeft,
                        top: bc.top + window.scrollY-marginTop, 
                        outer:{height:h,width:w},
                        inner:{height:e.clientHeight-(paddingTop+paddingBottom),width:e.clientWidth-(paddingRight+paddingLeft)}
                    }
             }
             return{
                  getOffset:getOffset,
                  selection:selection,
                  jQueryToNatif:jQueryToNatif,
                  isInPage:isInPage,
                  findParent:findParent,
                  touchPos:touchPos,
                  getTransform:getTransform,
             }
         }();   
  
     
        var EVENT=function(){
            //@FRAME REFRESH 
            var refresh = function(){ 
                //TOUCHEVENT.refresh();
                DOMMOVE.refresh();
            }
            var click = function (e){     
                TOUCHEVENT.click(e);   
            }
            
            var resize=function(e){
               
                 var w={x:window.innerWidth,y:window.innerHeight};
                //@OPTI RESIZE X
                if(w.x!=mem.window.x){
                    mem.window.x=w.x;
                    for(var i in dom.resize.x){dom.resize.x[i]();}
                }
            }
            
            var mousemove=function(e){  
  
              
               switch(dom.move){
                   default:
                       break;
                   case "whereYouGo":
                       TOUCHEVENT.mousemove(e);        
                       break;
                   case "dragAndDrop":
                       DOMMOVE.mousemove(e);
                       break;
                   case "longclick": 
                       break;
               }
            }
            var mousewheel=function(e){
                TOUCHEVENT.mousewheel(e); 
            }
            var mouseup=function(e){
               
                if(dom.click){
                    TOUCHEVENT.mouseup();
                }
                if(dom.dragAndDrop){
                    DOMMOVE.mouseup();
                }
                 dom.move=false;
            }
            
            return{
                click:click,
                resize:resize,
                mousemove:mousemove,
                mousewheel:mousewheel,
                mouseup:mouseup,
                refresh:refresh
            }
        }();
    
  
        function is_touch_device() {
            return 'ontouchstart' in window     
                || navigator.maxTouchPoints;       
        };
        setInterval(EVENT.refresh,param.fps);
        //@DOM EVENT 
        window.addEventListener("resize",EVENT.resize);
        document.addEventListener((/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel",EVENT.mousewheel);
  
        if(is_touch_device()){
             document.addEventListener("touchstart",EVENT.click);
             document.addEventListener("touchmove",EVENT.mousemove);
             document.addEventListener("touchend",EVENT.mouseup);
             document.addEventListener("touchleave",EVENT.mouseup);
        }else{
             document.addEventListener("mousedown",EVENT.click);
             document.addEventListener("mousemove",EVENT.mousemove);
             document.addEventListener("mouseup",EVENT.mouseup);
             document.addEventListener('mouseout', function(e) {
             if (e.toElement == null && e.relatedTarget == null) {
                
                 EVENT.mouseup(e);
             }
            });
        }
        
        return({
             touchevent:TOUCHEVENT.touchevent,
             move:DOMMOVE.startDragAndDrop, 
             onresize:DOMEVENT.onresize,
             selection:TOOLS.selection,
        });  
    }();
    
      
  
    
})();                
