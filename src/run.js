import React from 'react';
import ReactDOM from 'react-dom';

import PanelX from 'class/PanelX';
import Page1 from 'pageX/Page1';
import Page2 from 'pageX/Page2';
import Page3 from 'pageX/Page3';
import Page4 from 'pageX/Page4';

ReactDOM.render(
       <PanelX  object={[{element:Page1,title:"Page1"},{element:Page2,title:"Page2"},{element:Page3,title:"Page3"},{element:Page4,title:"Page4"}]}/>,
        document.getElementById('Panel')
);
DOM.selection(false);