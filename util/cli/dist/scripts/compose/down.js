import { execSync } from 'child_process';
import { findCompose } from '../find-composition.js';
export const downComposeHandler = (composeName, silent) => {
    const compose = findCompose(composeName);
    if (compose === undefined) {
        process.exit(1);
    }
    const composePath = compose['file'];
    try {
        silent === false
            ? console.log(`Начинаю удаление контейнеров внутри композиции: ${composeName}`)
            : null;
        execSync(`docker compose -f ./${composePath} down`, {
            stdio: 'inherit'
        });
        silent === false
            ? console.log(`Успешно выполнил удаление контейнеров внутри композиции: ${composeName}`)
            : null;
    }
    catch (error) {
        console.error(`Ошибка при попытке удаления композиции: ${error.message}`);
        process.exit(1);
    }
};
