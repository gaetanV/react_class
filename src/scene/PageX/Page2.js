import React from 'react';
import PanelY from 'class/PanelY';
import Page5 from 'pageY/Page5';
import Page6 from 'pageY/Page6';
import Page7 from 'pageY/Page7';

const Page2= React.createClass({
        render: function() {
            return (  
                  <div>
                    <PanelY  object={[Page5,Page6,Page7]}/>
                  </div>
            )
        }
});
    
export default Page2;