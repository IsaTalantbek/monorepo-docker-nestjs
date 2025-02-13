"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeHandler = void 0;
const run_1 = require("./run");
const shut_1 = require("./shut");
const composeHandler = (argv) => {
    const { composeName, silent, formatting, run, end, del } = argv;
    if (run === false && end === false) {
        console.error('не выбраны run или end флажки для compose <composeName> (-r, -e)');
        process.exit(1);
    }
    else if (run === true && end === true) {
        console.error('нельзя выбрать одновременно флажки run и shut в compose');
        process.exit(1);
    }
    if (run === true) {
        (0, run_1.runComposeHandler)(composeName, silent, formatting);
    }
    else if (end === true) {
        (0, shut_1.shutComposeHandler)(composeName, silent, del);
    }
};
exports.composeHandler = composeHandler;
