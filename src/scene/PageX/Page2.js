import React from 'react';
import PanelY from 'class/PanelY';
import Page5 from 'pageY/Page5';
import Page6 from 'pageY/Page6';
import Page7 from 'pageY/Page7';

class Page2 extends React.Component {
        render() {
            return (<PanelY   object={[Page5,Page6,Page7]}/>)
        }
};
    
export default Page2;