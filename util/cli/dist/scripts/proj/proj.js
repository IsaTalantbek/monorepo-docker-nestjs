import { downHandler } from './down.js';
import { runHandler } from './run.js';
import { stopHandler } from './stop.js';
export const projHandler = (argv) => {
    const { appName, action, formatting, compose_dev, compose_prod, silent } = argv;
    switch (action) {
        case 'run':
            runHandler(appName, silent, compose_dev, compose_prod, formatting);
            break;
        case 'stop':
            stopHandler(appName, silent);
            break;
        case 'down':
            downHandler(appName, silent);
            break;
        default:
            console.error(`${action} - неправильная команда. Доступна только run, stop, down`);
            process.exit(1);
    }
};
