export default class Error {
    constructor(errorText) {
        this.errorText = errorText;
    }

    throw() {
        return console.error(`Error: ${this.errorText}`);
    }
}
