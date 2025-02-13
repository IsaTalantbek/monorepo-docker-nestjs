"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runHandler = void 0;
const child_process_1 = require("child_process");
const find_project_1 = require("../find-project");
const converting_1 = require("../converting");
const runHandler = async (argv) => {
    const { appName, port, silent, docker, formatting } = argv;
    const appPath = (0, find_project_1.findProject)(appName);
    if (formatting === true) {
        silent === false
            ? console.log(`Начинаю форматирование в LF директорию ${appPath}, можно отключить написав -f`)
            : null;
        (0, converting_1.convertCRLFtoLF)(appPath);
        silent === false
            ? console.log(`Директория ${appPath} успешно конвертирована в LF`)
            : null;
    }
    if (docker === true) {
        if (!port) {
            console.error('Вы не указали порт для докер контейнера. Он устанавливается: -p <порт>');
            process.exit(1);
        }
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        try {
            const buildCommand = `docker build -t my-image-${randomNumber} -f ${appPath}/docker/dockerfile.prod ./${appPath}`;
            silent === false ? console.log(`Запуск: ${buildCommand}`) : null;
            (0, child_process_1.execSync)(buildCommand, { stdio: 'inherit' });
            const runCommand = `docker run --name my-container-${randomNumber} -d -p ${port}:3000 my-image-${randomNumber}`;
            silent === false ? console.log(`Запуск: ${runCommand}`) : null;
            (0, child_process_1.execSync)(runCommand, { stdio: 'inherit' });
            silent === false ? console.log('Контейнер успешно запущен!') : null;
        }
        catch (error) {
            console.error('Ошибка при запуске контейнера: ', error.message);
            process.exit(1);
        }
    }
    else {
        const npmArgs = ['--prefix', appPath, 'run start'];
        silent === false
            ? console.log(`Начинаю выполнение npm run start команды по пути ${appPath}`)
            : null;
        const child = (0, child_process_1.spawn)('npm', [...npmArgs], {
            stdio: 'inherit',
            shell: true
        });
        child.on('close', (code) => {
            silent === false
                ? console.log(`Успешно выполнил команду по пути ${appPath}`)
                : null;
            process.exit(code);
        });
    }
};
exports.runHandler = runHandler;
