import os from 'os';
import { execSync } from 'child_process';
import { findProject } from '../find-project.js';
export const cmdHandler = (argv) => {
    const { appName, cmd, silent } = argv;
    // Если cmd пустой, выводим ошибку
    if (cmd.length === 0) {
        console.error('Ошибка: необходимо передать команду.');
        process.exit(1);
    }
    const appPath = findProject(appName);
    const command = cmd.join(' ');
    silent === false
        ? console.log(`Начинаю выполнение ${command} по пути ${appPath}`)
        : null;
    const shell = os.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
    execSync(`cd ${appPath} && ${command}`, { stdio: 'inherit', shell });
    silent === false
        ? console.log(`Успешно выполнил ${command} по пути ${appPath}`)
        : null;
};
