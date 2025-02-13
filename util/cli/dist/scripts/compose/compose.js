import { runComposeHandler } from './run.js';
import { endComposeHandler } from './end.js';
export const composeHandler = (argv) => {
    const { composeName, silent, formatting, run, end, del } = argv;
    if (run === false && end === false) {
        console.error('не выбраны run или end флажки для compose <composeName> (-r, -e)');
        process.exit(1);
    }
    else if (run === true && end === true) {
        console.error('нельзя выбрать одновременно флажки run и end в compose');
        process.exit(1);
    }
    if (run === true) {
        runComposeHandler(composeName, silent, formatting);
    }
    else if (end === true) {
        endComposeHandler(composeName, silent, del);
    }
};
