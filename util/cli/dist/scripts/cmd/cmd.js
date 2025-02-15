import os from 'os';
import { execSync } from 'child_process';
import { findProject } from '../find-project.js';
export const cmdHandler = (argv) => {
    const flags = {};
    // Ищем все односимвольные флаги внутри argv
    Object.keys(argv).forEach((key) => {
        // Проверяем, что ключ состоит из одной буквы (флаг)
        if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
            // Если есть значение для флага, сохраняем его
            flags[key] = argv[key] !== true ? argv[key] : undefined; // Если флаг имеет значение, сохраняем его
        }
    });
    // Преобразуем флаги в строку с добавлением "-"
    const formattedFlags = Object.keys(flags)
        .map((flag) => flags[flag] !== undefined ? `-${flag} ${flags[flag]}` : `-${flag}`)
        .join(' ');
    const { appName, cmd } = argv;
    // Если cmd пустой, выводим ошибку
    if (cmd.length === 0) {
        console.error('Ошибка: необходимо передать команду.');
        process.exit(1);
    }
    const appPath = findProject(appName);
    const command = `${cmd.join(' ')} ${formattedFlags} `;
    const shell = os.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
    try {
        execSync(`cd ${appPath} && ${command}`, { stdio: 'inherit', shell });
    }
    catch (error) {
        process.exit(1);
    }
};
