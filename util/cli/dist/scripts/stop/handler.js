import { downProject } from './down.js';
import { stopProject } from './stop.js';
export const stopHandler = (argv) => {
    const { appName, silent, down } = argv;
    if (down === true) {
        downProject(appName, silent);
    }
    else {
        stopProject(appName, silent);
    }
};
