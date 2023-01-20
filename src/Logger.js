export default class Logger {
    constructor(type = 'DEFAULT LOG') {
        this.type = type;
    }
    call(...log) {
        console.log(this.type, log);
    }
}