import React from 'react';

class Page4 extends React.Component {
    constructor(props) {
        super(props);
        props.pong(this.componentDidSelect);
    }
    componentDidSelect() {
        console.log("pong4");
    }
    render() {
        return (
                <div className="page">
                    <h1>Page 4</h1>
                    <p>
                        Nam vel risus finibus, vestibulum arcu ut, viverra eros. 
                        Sed pulvinar tempor volutpat. Quisque rhoncus velit felis, ac ornare turpis iaculis a.
                        Proin non ornare tortor. Pellentesque eros sapien, posuere at sem ut, semper ullamcorper orci.
                        Curabitur ac sapien id tortor elementum mattis at in lorem. Sed eleifend orci ac lectus dignissim, 
                        vitae laoreet odio blandit. Integer orci dui, iaculis vel mattis eu, facilisis a arcu. Aenean venenatis sem quis velit euismod varius. 
                    </p>
                </div>
                )
    }
};

export default Page4;
