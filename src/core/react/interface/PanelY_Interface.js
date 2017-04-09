import PanelY from 'class/PanelY';

const PanelY_Interface = class {
    constructor(feedback) {
        this.feedback = feedback;            
        this.pingMe = false;
    }
    extend(func) {
        if (!this.pingMe && func instanceof PanelY) {
            this.pingMe = func.pingMe.bind(func);
        }
    }
}

export default PanelY_Interface;        