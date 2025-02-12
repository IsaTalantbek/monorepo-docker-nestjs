"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npmHandler = void 0;
const child_process_1 = require("child_process");
const find_project_1 = require("../find-project");
const npmHandler = (argv) => {
    const { appName, cmd, silent } = argv;
    // Если cmd пустой, выводим ошибку
    if (cmd.length === 0) {
        console.error('Ошибка: необходимо передать команду npm.');
        process.exit(1);
    }
    const appPath = (0, find_project_1.findProject)(appName);
    silent === false
        ? console.log(`Начинаю выполнение npm команды по пути ${appPath}`)
        : null;
    (0, child_process_1.execSync)(`npm --prefix ${appPath} ${[...cmd]}`, { stdio: 'inherit' });
    silent === false
        ? console.log(`Успешно выполнил команду по пути ${appPath}`)
        : null;
};
exports.npmHandler = npmHandler;
