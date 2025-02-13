import { execSync } from 'child_process';
import { findCompose } from '../find-composition.js';
export const endComposeHandler = (composeName, silent, del) => {
    const compose = findCompose(composeName);
    if (compose === undefined) {
        process.exit(1);
    }
    const composePath = compose['file'];
    const mess = del === true ? 'удаление' : 'остановка';
    const action = del === true ? 'down' : 'stop';
    try {
        silent === false
            ? console.log(`${mess} контейнеров внутри композиции: ${composeName}`)
            : null;
        execSync(`docker compose -f ${composePath} ${action}`, {
            stdio: 'inherit'
        });
        silent === false
            ? console.log(`Успешно выполнена ${mess} контейнеров внутри композиции: ${composeName}`)
            : null;
    }
    catch (error) {
        console.error(`Ошибка при попытке ${action} докер композ: ${error.message}`);
        process.exit(1);
    }
};
