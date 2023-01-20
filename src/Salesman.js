import Printer from "./Printer.js";
import Error from "./Error.js";

export default class Salesman {
    constructor(method) {
        this.method = method;
        this.time = { from: 0, to: 0 };
        this.printer = new Printer();
        this.availibleTownsError = new Error('Towns are not availible!');
        this.emptyTownsError = new Error('Towns are empty!');
    }

    init(arr, params) {
        if (!arr) return this.availibleTownsError.throw();
        if (!arr.length) return this.emptyTownsError.throw();
        const {min, path, moveHistory} = this.method.start(this.timerStart.bind(this), this.timerStop.bind(this), arr, params);
        this.printer.printConsole({
            'Lead time (milliseconds)': `${this.getTimeStamp()}`,
            'Answer': min,  
            'Min path': path, 
            'Move history': `${(moveHistory ? '\n' + moveHistory[min].join('\n') : '-')}`
        });
    }

    timerStart() {
        this.time.from = new Date();
    }

    timerStop() {
        this.time.to = new Date();
    }

    getTimeStamp() {
        return (this.time.to && this.time.from) ? (this.time.to - this.time.from) : '-';
    }
}