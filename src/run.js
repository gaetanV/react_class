import React from 'react';
import ReactDOM from 'react-dom';
import DOM from 'DOM';
import MenuX from 'class/MenuX';
import PanelX from 'class/PanelX';
import PanelX_Interface from 'interface/PanelX_Interface';
import Page1 from 'pageX/Page1';
import Page2 from 'pageX/Page2';
import Page3 from 'pageX/Page3';
import Page4 from 'pageX/Page4';

var panelInterface = new PanelX_Interface(MenuX);

ReactDOM.render(
        <section>
            <MenuX  interface={panelInterface} object={["page1", "page2", "page3", "page4"]}/>
            <div id="contenair">
                <PanelX interface={panelInterface} object={[Page1, Page2, Page3, Page4]}/>
            </div>
        </section>
        ,
        document.getElementById('Panel')
);

DOM.selection(false);