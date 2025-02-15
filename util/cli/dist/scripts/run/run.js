import { execSync, spawn } from 'child_process';
import { findProject } from '../find-project.js';
import { convertCRLFtoLF } from '../converting.js';
export const runHandler = async (argv) => {
    const { appName, silent, compose_dev, compose_prod, formatting } = argv;
    const appPath = findProject(appName);
    if (compose_dev === true || compose_prod === true) {
        if (formatting === true) {
            silent === false
                ? console.log(`Начинаю форматирование в LF директорию ${appPath}, можно отключить написав -f`)
                : null;
            await convertCRLFtoLF(appPath);
            silent === false
                ? console.log(`Директория ${appPath} успешно конвертирована в LF`)
                : null;
        }
        try {
            const environment = compose_prod === true ? '.prod' : '.dev';
            const buildCommand = `docker-compose -f ./${appPath}/docker/docker-compose${environment}.yml up --build`;
            silent === false ? console.log(`Запуск: ${buildCommand}`) : null;
            execSync(buildCommand, { stdio: 'inherit' });
            silent === false
                ? console.log('Композиция успешно запущена!')
                : null;
        }
        catch (error) {
            console.error('Ошибка при запуске композиции: ', error.message);
            process.exit(1);
        }
    }
    else {
        const npmArgs = ['--prefix', appPath, 'run start'];
        silent === false
            ? console.log(`Начинаю выполнение npm run start команды по пути ${appPath}`)
            : null;
        const child = spawn('npm', [...npmArgs], {
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
