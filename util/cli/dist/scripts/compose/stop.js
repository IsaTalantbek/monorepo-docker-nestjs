import { execSync } from 'child_process';
import { findCompose } from '../find-composition.js';
export const stopComposeHandler = (composeName, silent) => {
    const compose = findCompose(composeName);
    if (compose === undefined) {
        process.exit(1);
    }
    const composePath = compose['file'];
    try {
        silent === false
            ? console.log(`Начинаю остановку контейнеров внутри композиции: ${composeName}`)
            : null;
        execSync(`docker compose -f ./${composePath} stop`, {
            stdio: 'inherit'
        });
        silent === false
            ? console.log(`Успешно выполнил остановку контейнеров внутри композиции: ${composeName}`)
            : null;
    }
    catch (error) {
        console.error(`Ошибка при попытке остановки композиции: ${error.message}`);
        process.exit(1);
    }
};
