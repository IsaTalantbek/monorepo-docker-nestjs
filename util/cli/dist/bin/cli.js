#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createHandler } from '../scripts/create/create.js';
import { installHandler } from '../scripts/dependencies/install.js';
import { clearHandler } from '../scripts/dependencies/clear.js';
import { cmdHandler } from '../scripts/cmd/cmd.js';
import { composeHandler } from '../scripts/compose/compose.js';
import { prismaHandler } from '../scripts/prisma/prisma.js';
import { stopHandler } from '../scripts/stop/handler.js';
import { runHandler } from '../scripts/run/run.js';
yargs(hideBin(process.argv))
    .scriptName('pro')
    .command({
    command: 'create <type> <appName>',
    describe: 'создать app',
    builder: (yargs) => yargs
        .positional('type', {
        describe: 'тип проекта (app)',
        type: 'string'
    })
        .positional('appName', {
        description: 'название проекта',
        type: 'string'
    })
        .option('path', {
        alias: 'p',
        type: 'string',
        description: 'выбрать директорию где будет создан проект',
        default: undefined
    })
        .option('silent', {
        alias: 's',
        type: 'boolean',
        description: 'запуск без вывода в консоль',
        default: false
    }),
    handler: createHandler
})
    .command({
    command: 'install <appName>',
    describe: 'установить зависимости для проекта',
    builder: (yargs) => yargs
        .positional('appName', {
        describe: 'название проекта (внутри pro-cli)',
        type: 'string'
    })
        .option('silent', {
        alias: 's',
        type: 'boolean',
        description: 'запуск без вывода в консоль',
        default: false
    }),
    handler: installHandler
})
    .command({
    command: 'clear <appName>',
    describe: 'очистить зависимости для проекта (удаление node_modules и package-lock.json)',
    builder: (yargs) => {
        return yargs
            .positional('appName', {
            describe: 'название проекта (внутри pro-cli)',
            type: 'string'
        })
            .option('silent', {
            alias: 's',
            type: 'boolean',
            description: 'запуск без вывода в консоль',
            default: false
        });
    },
    handler: clearHandler
})
    .command({
    command: 'cmd <appName> [cmd..]',
    describe: 'позволяет использовать команды внутри проектов',
    builder: (yargs) => {
        return yargs
            .positional('appName', {
            describe: 'название проекта (внутри pro-cli)',
            type: 'string'
        })
            .positional('cmd', {
            describe: 'команда',
            type: 'string',
            array: true
        });
    },
    handler: cmdHandler
})
    .command({
    command: 'stop <appName>',
    describe: 'позволяет остановить композицию проекта',
    builder: (yargs) => {
        return yargs
            .positional('appName', {
            description: 'название проекта (внутри pro-cli)',
            type: 'string'
        })
            .option('down', {
            alias: 'd',
            type: 'boolean',
            description: 'удаляет композицию после остновки',
            default: false
        })
            .option('silent', {
            alias: 's',
            type: 'boolean',
            description: 'запуск без вывода в консоль',
            default: false
        });
    },
    handler: stopHandler
})
    .command({
    command: 'run <appName>',
    describe: 'запускает проект',
    builder: (yargs) => {
        return yargs
            .positional('appName', {
            description: 'название проекта (внутри pro-cli)',
            type: 'string'
        })
            .option('formatting', {
            alias: 'f',
            type: 'boolean',
            description: 'по умолчанию форматирует CRLF в LF перед запуском, выберите, чтобы отключить',
            default: true
        })
            .option('compose_dev', {
            alias: 'd',
            type: 'boolean',
            description: 'запуск dev докер композиции, вместо обычного запуска',
            default: false
        })
            .option('compose_prod', {
            alias: 'p',
            type: 'boolean',
            description: 'запуск prod докер композиции, вместо обычного запуска',
            default: false
        })
            .option('silent', {
            alias: 's',
            type: 'boolean',
            description: 'запуск без вывода в консоль',
            default: false
        });
    },
    handler: runHandler
})
    .command({
    command: 'compose <composeName> <action>',
    describe: 'взаимодействие с докер композицией',
    builder: (yargs) => {
        return yargs
            .positional('composeName', {
            description: 'название композиции (внутри pro-cli)',
            type: 'string'
        })
            .positional('action', {
            description: 'run - запустить, stop - отключить, down - удалить',
            type: 'string'
        })
            .option('formatting', {
            alias: 'f',
            type: 'boolean',
            description: 'по умолчанию форматирует CRLF в LF перед запуском, выберите, чтобы отключить',
            default: true
        })
            .option('silent', {
            alias: 's',
            type: 'boolean',
            description: 'запуск без вывода в консоль',
            default: false
        });
    },
    handler: composeHandler
})
    .command({
    command: 'prisma <appName> <action>',
    describe: 'взаимодействие с призмой',
    builder: (yargs) => {
        return yargs
            .positional('appName', {
            description: 'название проекта (внутри pro-cli)',
            type: 'string'
        })
            .positional('action', {
            description: 'dev - prisma migrate dev, deploy - prisma migrate deploy, gen - prisma generate',
            type: 'string'
        })
            .option('silent', {
            alias: 's',
            type: 'boolean',
            description: 'запуск без вывода в консоль',
            default: false
        });
    },
    handler: prismaHandler
})
    .help()
    .parseAsync();
