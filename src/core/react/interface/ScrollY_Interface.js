import ScrollY from 'class/ScrollY';

const ScrollY_Interface = class {
    constructor(feedback) {
        this.feedback = feedback;  
        this.resetY = false;
        this.componentDidReload = false;
    }
    extend(func) {
        if (!this.componentDidReload && func instanceof this.feedback) {
            this.componentDidReload = func.componentDidReload.bind(func);
        }
        if (!this.resetY && func instanceof ScrollY) {
            this.resetY = func.resetY.bind(func);
        }
    }
}

export default ScrollY_Interface;        