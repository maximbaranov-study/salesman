import Logger from "./Logger.js";

export default class Bf {
    constructor() {
        this.towns = [[]]; 
        this.path = [];
        this.minPath = [];
        this.moveHistory = {};
        this.ans = Infinity;

        this.calcLogger = new Logger('CALCULATE LOG');
        this.startLogger = new Logger('START LOG');

        this.t_start = null;
        this.t_stop = null;
    }

    // Start
    start(timerStart, timerStop, towns, params) {
        this.towns = towns;
        this.t_start = timerStart;
        this.t_stop = timerStop;

        this.t_start(); // Time stamp start
        this.bf(params);
        this.t_stop(); // Time stamp end

        return {min: this.ans, path: this.minPath, moveHistory: this.moveHistory};
    }

    bf({ idx, log }) {
        // Log
        log && this.startLogger.call(`New rec with idx: ${idx}...`);

        // Path is fill
        if (idx == this.towns.length) {
            this.ans = this.areDistinct(this.path) ? Math.min(this.ans, this.calculation(this.towns, log)) : this.ans;   
            return;
        }
        
        // Change path (rec)
        for (let i = 1; i <= this.towns.length; i++) {
            this.path[idx] = i;
            // Log
            log && this.startLogger.call(this.path);
            this.bf({idx: idx + 1, log});
        }
    }

    // Distinct check
    areDistinct(arr) {
        let s = new Set();
        arr.map(i => s.add(i));
        return s.size == arr.length;
    }

    // Calculation
    calculation(arr, log) {
        const move = [];
        const p = this.path, n = this.path.length;

        // Array of length
        const length = p
        .map((el, i) => {
            // Back to the first town
            if (el == p[n - 1]) {
                log && this.calcLogger.call(`(${p[n - 1]}, ${p[0]}) = ${arr[p[n - 1] - 1][p[0] - 1]}`)
                move.push(`(${p[n - 1]}, ${p[0]}) = ${arr[p[n - 1] - 1][p[0] - 1]}`)
                return arr[p[n - 1] - 1][p[0] - 1];
            }
            // Log
            log && this.calcLogger.call(`(${el}, ${p[i + 1]}) = ${arr[el - 1][p[i + 1] - 1]}`)
            move.push(`(${el}, ${p[i + 1]}) = ${arr[el - 1][p[i + 1] - 1]}`)
            return arr[el - 1][p[i + 1] - 1];
        })
        .reduce((acc, el) => acc + el, 0);

        // Save minPath
        length < this.ans && (this.minPath = [...p]);

        // Save moves
        this.moveHistory[length] = move;

        return length;
    } 
}





