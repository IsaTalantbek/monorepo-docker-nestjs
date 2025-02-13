"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runComposeHandler = void 0;
const child_process_1 = require("child_process");
const find_composition_1 = require("../find-composition");
const converting_1 = require("../converting");
const find_project_1 = require("../find-project");
const runComposeHandler = (composeName, silent, formatting) => {
    const compose = (0, find_composition_1.findCompose)(composeName);
    if (compose === undefined) {
        process.exit(1);
    }
    const composePath = compose['file'];
    if (formatting === true) {
        silent === false
            ? console.log(`Начинаю форматирование проектов внутри композиции ${composePath}, можно отключить написав -f`)
            : null;
        const projects = compose['projects'];
        projects.forEach((proj) => {
            const projPath = (0, find_project_1.findProject)(proj);
            (0, converting_1.convertCRLFtoLF)(projPath);
        });
        silent === false
            ? console.log(`Закончил форматирование проектов внутри композиции ${composePath}`)
            : null;
    }
    try {
        silent === false
            ? console.log(`Запуск докер композиции: ${composePath}`)
            : null;
        (0, child_process_1.execSync)(`docker compose -f ./${composePath} up --build`, {
            stdio: 'inherit'
        });
        silent === false
            ? console.log(`Успешно запустилась докер композиция: ${composePath}`)
            : null;
    }
    catch (error) {
        console.error(`Ошибка при попытке запустить докер композ: ${error.message}`);
        process.exit(1);
    }
};
exports.runComposeHandler = runComposeHandler;
