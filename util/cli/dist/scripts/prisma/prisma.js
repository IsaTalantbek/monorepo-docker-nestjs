import { execSync } from 'child_process';
import { findProject } from '../find-project.js';
import { useCommandIn } from '../use-command.js';
export const prismaHandler = (argv) => {
    const { appName, action, silent } = argv;
    const appPath = findProject(appName);
    const composePath = `./${appPath}/docker/docker-compose.dev.yml`;
    const prodComposePath = `./${appPath}/docker/docker-compose.prod.yml`;
    switch (action) {
        case 'dev':
            silent === false
                ? console.log(`Запускаю команду npx prisma migrate dev в ${appPath}`)
                : null;
            execSync(`docker compose -f ${composePath} up -d ${appName}_db `, {
                stdio: 'inherit'
            });
            waitForDB(`${appName}_db`);
            useCommandIn(appPath, 'npx prisma migrate dev');
            execSync(`docker compose -f ${composePath} down ${appName}_db `, {
                stdio: 'inherit'
            });
            silent === false
                ? console.log(`Выполнил команду npx prisma migrate dev в ${appPath}`)
                : null;
            break;
        case 'deploy':
            silent === false
                ? console.log(`Запускаю команду npx prisma migrate deploy в ${appPath}`)
                : null;
            execSync(`docker compose -f ${prodComposePath} up -d ${appName}_db `, {
                stdio: 'inherit'
            });
            waitForDB(`${appName}_db`);
            useCommandIn(appPath, 'npx prisma migrate deploy');
            execSync(`docker compose -f ${prodComposePath} down ${appName}_db `, {
                stdio: 'inherit'
            });
            silent === false
                ? console.log(`Выполнил команду npx prisma migrate deploy в ${appPath}`)
                : null;
            break;
        case 'gen':
            silent === false
                ? console.log(`Запускаю команду npx prisma generate в ${appPath}`)
                : null;
            useCommandIn(appPath, 'npx prisma generate');
            silent === false
                ? console.log(`Выполнил команду npx prisma generate в ${appPath}`)
                : null;
            break;
    }
};
function waitForDB(containerName, maxAttempts = 100, delay = 2000) {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            execSync(`docker exec ${containerName} pg_isready -U user`, {
                stdio: 'ignore'
            });
            return;
        }
        catch (error) {
            // Заменили sleep на setTimeout с Promise
            const delayPromise = new Promise((resolve) => setTimeout(resolve, delay));
            delayPromise.then(() => { });
        }
    }
    throw new Error('Database did not start in time');
}
