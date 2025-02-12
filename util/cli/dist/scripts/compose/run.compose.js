"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runComposeHandler = void 0;
const child_process_1 = require("child_process");
const find_composition_1 = require("../find-composition");
const runComposeHandler = (argv) => {
    const { composeName, silent } = argv;
    const composePath = (0, find_composition_1.findCompose)(composeName);
    try {
        silent === false
            ? console.log(`Запуск докер композиции: ${composePath}`)
            : null;
        (0, child_process_1.execSync)(`docker-compose -f ./${composePath} up --build`, {
            stdio: 'inherit'
        });
        silent === false
            ? console.log(`Успешно запустилась докер композиция: ${composePath}`)
            : null;
    }
    catch (error) {
        console.error(`Ошибка при попытке запустить докер композ: ${error}`);
        process.exit(1);
    }
};
exports.runComposeHandler = runComposeHandler;
