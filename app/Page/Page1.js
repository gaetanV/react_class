(function() {
    'use strict';
    Page1= React.createClass({
        handleClick: function(e){
             $(e.target).css({"background":"blue"});
        
            
            var callback=function(e){
                
                
               if(e.etat=="click"){
                    $(e.target).css({"background":"white"});
               }
               if(e.etat=="longclick"){
                    $(e.target).css({"background":"red"});
               }
               if(e.etat=="longclickend"){
                    $(e.target).css({"background":"white"});
               }
               
            }
            DOM.onlongclick(e,callback)
            
        },
        render: function() {
            return (
                <div  className="page">
                    <h1>Page 1</h1>
                    <p className="longclick" onMouseDown={this.handleClick} id="com">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent quis metus sed metus convallis efficitur sit amet sed tortor. 
                        Integer egestas lectus ac molestie ultricies. Nam ultricies volutpat libero id egestas.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ac dignissim purus.
                        Integer a fermentum libero. Suspendisse malesuada ex eget ligula tincidunt, id commodo enim tincidunt.
                        Fusce sagittis nisi eu egestas rhoncus. In sodales diam vitae quam rhoncus, eget elementum massa consectetur.
                        Pellentesque scelerisque eleifend vehicula. Nulla in nibh efficitur, eleifend sem eget, sodales elit.
                        Maecenas vulputate, nisi ut iaculis fringilla, mauris metus varius ligula, et facilisis arcu metus vitae ipsum.
                        Donec viverra ultrices nulla nec ullamcorper. Proin dictum ipsum a tellus efficitur, id rhoncus leo vestibulum
                        . Morbi consectetur massa tempor eros hendrerit convallis. 
                    </p>
                     <p className="longclick" onMouseDown={this.handleClick}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent quis metus sed metus convallis efficitur sit amet sed tortor. 
                        Integer egestas lectus ac molestie ultricies. Nam ultricies volutpat libero id egestas.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ac dignissim purus.
                        Integer a fermentum libero. Suspendisse malesuada ex eget ligula tincidunt, id commodo enim tincidunt.
                        Fusce sagittis nisi eu egestas rhoncus. In sodales diam vitae quam rhoncus, eget elementum massa consectetur.
                        Pellentesque scelerisque eleifend vehicula. Nulla in nibh efficitur, eleifend sem eget, sodales elit.
                        Maecenas vulputate, nisi ut iaculis fringilla, mauris metus varius ligula, et facilisis arcu metus vitae ipsum.
                        Donec viverra ultrices nulla nec ullamcorper. Proin dictum ipsum a tellus efficitur, id rhoncus leo vestibulum
                        . Morbi consectetur massa tempor eros hendrerit convallis. 
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent quis metus sed metus convallis efficitur sit amet sed tortor. 
                        Integer egestas lectus ac molestie ultricies. Nam ultricies volutpat libero id egestas.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ac dignissim purus.
                        Integer a fermentum libero. Suspendisse malesuada ex eget ligula tincidunt, id commodo enim tincidunt.
                        Fusce sagittis nisi eu egestas rhoncus. In sodales diam vitae quam rhoncus, eget elementum massa consectetur.
                        Pellentesque scelerisque eleifend vehicula. Nulla in nibh efficitur, eleifend sem eget, sodales elit.
                        Maecenas vulputate, nisi ut iaculis fringilla, mauris metus varius ligula, et facilisis arcu metus vitae ipsum.
                        Donec viverra ultrices nulla nec ullamcorper. Proin dictum ipsum a tellus efficitur, id rhoncus leo vestibulum
                        . Morbi consectetur massa tempor eros hendrerit convallis. 
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent quis metus sed metus convallis efficitur sit amet sed tortor. 
                        Integer egestas lectus ac molestie ultricies. Nam ultricies volutpat libero id egestas.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ac dignissim purus.
                        Integer a fermentum libero. Suspendisse malesuada ex eget ligula tincidunt, id commodo enim tincidunt.
                        Fusce sagittis nisi eu egestas rhoncus. In sodales diam vitae quam rhoncus, eget elementum massa consectetur.
                        Pellentesque scelerisque eleifend vehicula. Nulla in nibh efficitur, eleifend sem eget, sodales elit.
                        Maecenas vulputate, nisi ut iaculis fringilla, mauris metus varius ligula, et facilisis arcu metus vitae ipsum.
                        Donec viverra ultrices nulla nec ullamcorper. Proin dictum ipsum a tellus efficitur, id rhoncus leo vestibulum
                        . Morbi consectetur massa tempor eros hendrerit convallis. 
                    </p>
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent quis metus sed metus convallis efficitur sit amet sed tortor. 
                        Integer egestas lectus ac molestie ultricies. Nam ultricies volutpat libero id egestas.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ac dignissim purus.
                        Integer a fermentum libero. Suspendisse malesuada ex eget ligula tincidunt, id commodo enim tincidunt.
                        Fusce sagittis nisi eu egestas rhoncus. In sodales diam vitae quam rhoncus, eget elementum massa consectetur.
                        Pellentesque scelerisque eleifend vehicula. Nulla in nibh efficitur, eleifend sem eget, sodales elit.
                        Maecenas vulputate, nisi ut iaculis fringilla, mauris metus varius ligula, et facilisis arcu metus vitae ipsum.
                        Donec viverra ultrices nulla nec ullamcorper. Proin dictum ipsum a tellus efficitur, id rhoncus leo vestibulum
                        . Morbi consectetur massa tempor eros hendrerit convallis. 
                    </p>
                </div>
            )
        }
    });
})(); 