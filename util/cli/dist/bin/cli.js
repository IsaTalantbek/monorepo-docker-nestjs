#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createHandler } from '../scripts/create/create.js';
import { installHandler } from '../scripts/dependencies/install.js';
import { clearHandler } from '../scripts/dependencies/clear.js';
import { cmdHandler } from '../scripts/cmd/cmd.js';
import { runHandler } from '../scripts/run/run.js';
import { composeHandler } from '../scripts/compose/compose.js';
yargs(hideBin(process.argv))
    .scriptName('pro')
    .command({
    command: 'create <type>',
    describe: 'создать app',
    builder: (yargs) => yargs
        .positional('type', {
        describe: 'тип проекта (app)',
        type: 'string'
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
    describe: 'установить зависимости для микросервиса',
    builder: (yargs) => yargs
        .positional('appName', {
        describe: 'название проекта внутри pro-cli',
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
    describe: 'очистить зависимости для микросервиса',
    builder: (yargs) => {
        return yargs
            .positional('appName', {
            describe: 'название проекта внутри pro-cli',
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
            describe: 'название проекта внутри pro-cli',
            type: 'string'
        })
            .positional('cmd', {
            describe: 'команда',
            type: 'string',
            array: true
        })
            .option('silent', {
            alias: 's',
            type: 'boolean',
            description: 'запуск без вывода в консоль',
            default: false
        });
    },
    handler: cmdHandler
})
    .command({
    command: 'run <appName>',
    describe: 'запускает проект',
    builder: (yargs) => {
        return yargs
            .positional('appName', {
            describe: 'название проекта внутри pro-cli',
            type: 'string'
        })
            .option('formatting', {
            alias: 'f',
            type: 'boolean',
            description: 'конвертировать CRLF в LF перед запуском? По дефолту да. Выберите флажок если ненадо',
            default: true
        })
            .option('port', {
            alias: 'p',
            type: 'string',
            description: 'на какой порт перебросить докер контейнер. Использовать только с -d',
            default: '3000'
        })
            .option('docker', {
            alias: 'd',
            type: 'boolean',
            describtion: 'запуск докерфайла, вместо обычного запуска',
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
    command: 'compose <composeName>',
    describe: 'взаимодействие с докер композицией',
    builder: (yargs) => {
        return yargs
            .positional('composeName', {
            describe: 'название композиции внутри pro-cli',
            type: 'string'
        })
            .option('run', {
            alias: 'r',
            type: 'boolean',
            description: 'запускает докер композицию',
            default: false
        })
            .option('end', {
            alias: 'e',
            type: 'boolean',
            description: 'удаляет или останавливает композицию. Добавьте еще -d, если хотите удалить контейнеры',
            default: false
        })
            .option('del', {
            alias: 'd',
            type: 'boolean',
            description: 'удаляет контейнеры в композиции',
            default: false
        })
            .option('formatting', {
            alias: 'f',
            type: 'boolean',
            description: 'конвертировать CRLF в LF перед запуском? По дефолту да. Выберите флажок если ненадо',
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
    .help()
    .parseAsync();
