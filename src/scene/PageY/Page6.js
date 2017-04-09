import React from 'react';

class Page6 extends React.Component {
    constructor(props) {
         super(props);
         props.pong (this.componentDidSelect);
    }
    componentDidSelect(bool) {
        if (bool) {
            console.log("pong6 in")
        } else {
            console.log("pong6 out")
        }
    }
    render(){
        return (
            <div className="page">
            <h1>Page 6</h1>
                    <p>
                        Nam sed facilisis mi, ut elementum quam. Etiam enim augue, 
                        tempus sit amet purus at, tempor accumsan massa. Aliquam a ornare neque, 
                        sit amet pharetra magna. Aliquam tincidunt venenatis mi quis scelerisque. 
                        Nulla egestas, est venenatis porta lacinia, quam velit rutrum sem, aliquet consequat felis elit nec ex.
                        Aliquam a dui ex. Aenean orci libero, scelerisque ac dapibus at, porttitor vel turpis. Donec id tristique massa. 
                        Etiam pulvinar nec nulla a ultricies. Sed vestibulum, orci in pulvinar bibendum, orci ipsum rhoncus tellus, 
                        nec dignissim sapien metus sed neque. Praesent porta, turpis vel sodales sagittis, tellus metus dictum ligula, vel consectetur 
                        ligula neque ut velit. Curabitur aliquet, ante non commodo pulvinar, orci ipsum dignissim felis, eu gravida massa erat vel risus.  
                    </p>
            </div>
        )
    }
};
    
export default Page6;