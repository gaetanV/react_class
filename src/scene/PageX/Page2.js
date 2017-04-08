import React from 'react';
import PanelY from 'class/PanelY';
import Page5 from 'pageY/Page5';
import Page6 from 'pageY/Page6';
import Page7 from 'pageY/Page7';

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        props.pong(this.componentDidSelect);
    }
    componentDidSelect() {
        console.log("pong2");
    }
    render() {
        return (<PanelY   collection={[Page5, Page6, Page7]}/>)
    }
}

export default Page2;