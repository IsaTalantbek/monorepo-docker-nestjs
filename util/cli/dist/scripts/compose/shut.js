"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutComposeHandler = void 0;
const child_process_1 = require("child_process");
const find_composition_1 = require("../find-composition");
const shutComposeHandler = (composeName, silent, del) => {
    const compose = (0, find_composition_1.findCompose)(composeName);
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
        (0, child_process_1.execSync)(`docker compose -f ${composePath} ${action}`, {
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
exports.shutComposeHandler = shutComposeHandler;
