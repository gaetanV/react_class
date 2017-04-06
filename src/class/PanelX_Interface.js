import MenuX from 'class/MenuX';
import PanelX from 'class/PanelX';

const PanelX_Interface = class {
    constructor() {
        this.menu = false;
        this.panel = false;

    }
    extend(func) {
        if (!this.menu && func instanceof MenuX) {
            this.menu = func.menu;

        }
        if (!this.panel && func instanceof PanelX) {
            this.panel = func.panel;
        }
    }
}

export default PanelX_Interface;        