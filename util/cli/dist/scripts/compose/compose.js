import { downComposeHandler } from './down.js';
import { runComposeHandler } from './run.js';
import { stopComposeHandler } from './stop.js';
export const composeHandler = (argv) => {
    const { composeName, silent, formatting, action } = argv;
    switch (action) {
        case 'run':
            runComposeHandler(composeName, silent, formatting);
            break;
        case 'stop':
            stopComposeHandler(composeName, silent);
            break;
        case 'down':
            downComposeHandler(composeName, silent);
            break;
        default:
            console.error(`${action} - неправильная команда. Доступна только run, stop, down`);
            process.exit(1);
    }
};
