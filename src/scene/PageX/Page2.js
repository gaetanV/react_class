import React from 'react';
import PanelY from 'class/PanelY';
import Page5 from 'pageY/Page5';
import Page6 from 'pageY/Page6';
import Page7 from 'pageY/Page7';
import PanelY_Interface from 'interface/PanelY_Interface';

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        props.pong(this.componentDidSelect.bind(this));
        this.interface = new PanelY_Interface();
    }
    componentDidSelect(bool) {
        if (bool) {
            this.interface.pingMe(true);
            console.log("pong2 in");
        } else {
            this.interface.pingMe(false);
            console.log("pong2 out");
        }
    }
    render() {
        return (<PanelY interface={this.interface}  collection={[Page5, Page6, Page7]}/>)
    }
}

export default Page2;