export default class Printer {
    constructor() {}

    printConsole(params) {
        console.log('------------------------------ Report ------------------------------');
        Object.keys(params).map(key => console.log(`${key}: ${params[key]}`));
        console.log('------------------------------ Report ------------------------------');
    }
}