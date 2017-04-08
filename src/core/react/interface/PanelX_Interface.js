import PanelX from 'class/PanelX';

const PanelX_Interface = class {
    constructor(feedback) {
        this.feedback = feedback;            
        this.menu = false;
        this.panel = false;
    }
    extend(func) {
        if (!this.menu && func instanceof this.feedback) {
            this.menu = func.menu.bind(func);
        }
        if (!this.panel && func instanceof PanelX) {
            this.panel = func.panel.bind(func);
        }
    }
}

export default PanelX_Interface;        