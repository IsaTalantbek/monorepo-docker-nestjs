import { execSync } from 'child_process';
import { findProject } from '../find-project.js';
import os from 'os';
export const installHandler = (argv) => {
    const { appName, silent } = argv;
    if (!appName) {
        console.error('⚠️ Укажите имя приложения: cli install <app-name>');
        process.exit(1);
    }
    const appPath = findProject(appName);
    try {
        if (silent === true) {
            const shell = os.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
            execSync(`cd ${appPath} && npm install`, {
                stdio: 'inherit',
                shell
            });
        }
        else {
            console.log(`🔄 Устанавливаю зависимости для ${appPath}...`);
            const shell = os.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
            execSync(`cd ${appPath} && npm install`, {
                stdio: 'inherit',
                shell
            });
            console.log(`✅ Зависимости для ${appPath} успешно установлены.`);
        }
    }
    catch (error) {
        console.error(`❌ Ошибка установки зависимостей для ${appPath}:`, error.message);
        process.exit(1);
    }
};
