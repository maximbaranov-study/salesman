import Logger from "./Logger.js";

export default class Tsp {
    constructor() {
        this.matrix = [[]];
        this.matrix_mirror = this.matrix;
        this.borders = { row: [], col: [] };
        this.path = [];
        this.weights = [];
        this.minPath = [];
        this.ans = 0;

        this.tspLogger = new Logger('TSP LOG');

        this.t_start = null;
        this.t_stop = null;
    }

    // Start
    start(timerStart, timerStop, arr, { log }) {
        this.matrix = this.matrix_mirror = arr;
        this.t_start = timerStart;
        this.t_stop = timerStop;

        for (let i = 0; i < this.matrix.length; i++) {
            this.borders.row.push(i + 1);
            this.borders.col.push(i + 1);
        }

        this.t_start(); // Time stamp start
        this.tsp(log);
        this.t_stop(); // Time stamp end

        return { min: this.ans, path: this.minPath, moveHistory: null }
    }

    // Transpose matrix
    transpose(matrix) {
        return matrix[0].map((_, i) => matrix.map((row) => row[i]));
    }

    // Counter
    count(arr, value) {
        const c = arr.reduce((acc, n) => {
            (n == value) && (acc += 1)
            return acc
        }, 0)
        return c;
    }

    // Tranform rows
    tranformRows() {
        this.matrix = this.matrix.map(row => row.map(el => el - Math.min(...row)));
    }

    // Tranform cols
    tranformCols() {
        this.matrix = this.transpose(this.matrix);
        this.matrix = this.matrix.map(col => col.map(el => el - Math.min(...col)));
        this.matrix = this.transpose(this.matrix);
    }

    // Weight
    getWeight(row, col) {
        let minRow = Infinity;
        let minCol = Infinity;
      
        minRow = Math.min(...this.matrix[row].filter((_, i) => i != col));
        this.matrix = this.transpose(this.matrix);
        minCol = Math.min(...this.matrix[col].filter((_, i) => i != row));
        this.matrix = this.transpose(this.matrix);
    
        return minRow + minCol;
    }

    // Delete row
    deleteRow(row) {
        this.matrix.splice(row, 1);
        this.borders.row.splice(row, 1);
    }
    
    // Delete col
    deleteCol(col) {
        this.matrix = this.transpose(this.matrix);
        this.matrix.splice(col, 1);
        this.borders.col.splice(col, 1);
        this.matrix = this.transpose(this.matrix);
    }

    // Format path to normal view
    formatPath() {
        const arr = [];
        for (let i = 0; i < this.path.length; i += 2) {
            if (this.count(this.path, this.path[i]) < 2) {
                arr.push(this.path[i])
                arr.push(this.path[i + 1])
            }
        }
        for (let i = 0; i < this.path.length; i += 2) {
            for (let j = 0; j < this.path.length; j += 2) {
                if (arr[arr.length - 1] == this.path[j]) {
                    arr.push(this.path[j])
                    arr.push(this.path[j + 1])
                }
            }
        }
        return arr;
    }

    // Calculation
    calculation() {
        this.minPath = this.formatPath();
        const n = this.minPath.length;

        for (let i = 0; i < (n - 1); i += 2) {
            if (i == (n - 2)) {
                this.ans += this.matrix_mirror[this.minPath[i + 1] - 1][this.minPath[0] - 1]
            }
            this.ans += this.matrix_mirror[this.minPath[i] - 1][this.minPath[i + 1] - 1];
        }
    }

    // Tsp
    tsp(log) {
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i][i] = Infinity;
        }
        this.tranformRows();
        this.tranformCols();
        this.weights = [].concat(this.matrix
            .map((row, i) => row
            .map((el, j) => (el == 0 ? this.getWeight(i, j) : 0)))
        );
        let maxWeight = Math.max(...this.weights.flat());

        let maxElementPos = { row: 0, col: 0, val: -1 };
        for (let j = 0; j < this.matrix.length; j++)
            for (let i = 0; i < this.matrix.length; i++)
                if (this.weights[i][j] == maxWeight && maxElementPos.val == -1) maxElementPos = { row: i, col: j, val: maxWeight };
    
        this.path.push(this.borders.row[maxElementPos.row]); // First step
        this.path.push(this.borders.col[maxElementPos.col]); // Second step
    
        this.deleteRow(maxElementPos.row); // Delete str with max weight
        this.deleteCol(maxElementPos.col); // Delete col with max weight
        
        // Log
        log && this.tspLogger.call('Matrix:', this.matrix, 'Path:', this.path)

        // Exit
        if (this.matrix.length == 1) {
            this.calculation();
            return;
        }
    
        this.tsp(log);
    }

}
