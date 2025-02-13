import { execSync, spawn } from 'child_process';
import { findProject } from '../find-project.js';
import { convertCRLFtoLF } from '../converting.js';
export const runHandler = async (argv) => {
    const { appName, port, silent, docker, formatting } = argv;
    const appPath = findProject(appName);
    if (docker === true) {
        if (formatting === true) {
            silent === false
                ? console.log(`Начинаю форматирование в LF директорию ${appPath}, можно отключить написав -f`)
                : null;
            await convertCRLFtoLF(appPath);
            silent === false
                ? console.log(`Директория ${appPath} успешно конвертирована в LF`)
                : null;
        }
        if (!port) {
            console.error('Вы не указали порт для докер контейнера. Он устанавливается: -p <порт>');
            process.exit(1);
        }
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        try {
            const buildCommand = `docker build -t my-image-${randomNumber} -f ${appPath}/docker/dockerfile.prod ./${appPath}`;
            silent === false ? console.log(`Запуск: ${buildCommand}`) : null;
            execSync(buildCommand, { stdio: 'inherit' });
            const runCommand = `docker run --name my-container-${randomNumber} -d -p ${port}:3000 my-image-${randomNumber}`;
            silent === false ? console.log(`Запуск: ${runCommand}`) : null;
            execSync(runCommand, { stdio: 'inherit' });
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
