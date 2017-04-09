import ScrollY from 'class/ScrollY';

const ScrollY_Interface = class {
    constructor(feedback) {
        this.feedback = feedback;  
        this.resetY = false;
    }
    extend(func) {
        if (!this.resetY && func instanceof ScrollY) {
            this.resetY = func.resetY.bind(func);
        }
    }
}

export default ScrollY_Interface;        