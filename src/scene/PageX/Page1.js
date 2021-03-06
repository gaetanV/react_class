import React from 'react';
import $ from 'jquery';
import DOM from 'DOM';
import ScrollY from 'class/ScrollY';
import ScrollY_Interface from 'interface/ScrollY_Interface';

class Page1 extends React.Component {
    constructor(props) {
         super(props);
         this.state = {test: 0 };
         this.interface = new ScrollY_Interface(Page1);
         this.interface.extend(this);
         props.pong (this.componentDidSelect.bind(this));
    }
    componentDidReload(){
          console.log("Get your API Page 1");
    }
    componentDidSelect(bool){
        if(bool){
             console.log("pong1 in")
        }else{
            this.interface.resetY();
            console.log("pong1 out")
        }
    }
    componentDidMount() {
        var d = $(this.refs.Main).find(".longclick");
        for (var i = 0; i < d.length; i++) {
            var dom = DOM(d[i]);
            dom.touchevent('longclick', this.longclick);
            dom.touchevent('longclickup', this.longclickup);
        }
    }
    longclickup(e) {
        $(e.target).css({"background": "white"});

    }
    longclick(e) {
        $(e.target).css({"background": "red"});
    }
    render() {

        return (
                <ScrollY interface={this.interface}> 
                    <div ref="Main"  className="page">
                        <h1>Page 1</h1>
                        <p className="longclick" onMouseDown={this.handleClick} >
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
                </ScrollY>
        )
    }
}

export default Page1;