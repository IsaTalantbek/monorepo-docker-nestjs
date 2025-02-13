#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const create_1 = require("../scripts/create/create");
const install_1 = require("../scripts/dependencies/install");
const clear_1 = require("../scripts/dependencies/clear");
const cmd_1 = require("../scripts/cmd/cmd");
const run_1 = require("../scripts/run/run");
const compose_1 = require("../scripts/compose/compose");
yargs_1.default
    .command({
    command: 'create <type>',
    describe: 'создать app',
    builder: (yargs) => {
        return yargs
            .positional('type', {
            describe: 'тип проекта (app)',
            type: 'string'
        })
            .option('silent', {
            alias: 's',
            type: 'boolean',
            description: 'запуск без вывода в консоль',
            default: false
        });
    },
    handler: create_1.createHandler
})
    .help();
yargs_1.default
    .command({
    command: 'install <appName>',
    describe: 'установить зависимости для микросервиса',
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
    handler: install_1.installHandler
})
    .help();
yargs_1.default
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
    handler: clear_1.clearHandler
})
    .help();
yargs_1.default
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
    handler: cmd_1.cmdHandler
})
    .help();
yargs_1.default.command({
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
    handler: run_1.runHandler
});
yargs_1.default.command({
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
    handler: compose_1.composeHandler
});
// Обработка всех команд
yargs_1.default.parse();
