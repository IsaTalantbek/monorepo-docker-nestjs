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
// Команда 'create' с дополнительным аргументом для типа
yargs_1.default.command({
    command: 'create <type>',
    describe: 'создать app',
    builder: (yargs) => {
        return yargs.positional('type', {
            describe: 'Тип проекта (app)',
            type: 'string'
        });
    },
    handler: create_1.createHandler
});
yargs_1.default.command({
    command: 'install <appName>',
    describe: 'установить зависимости для микросервиса',
    builder: (yargs) => {
        return yargs.positional('appName', {
            describe: 'название микросервиса',
            type: 'string'
        });
    },
    handler: install_1.installHandler
});
yargs_1.default.command({
    command: 'clear <appName>',
    describe: 'очистить зависимости для микросервиса',
    builder: (yargs) => {
        return yargs.positional('appName', {
            describe: 'название микросервиса',
            type: 'string'
        });
    },
    handler: clear_1.clearHandler
});
// Обработка всех команд
yargs_1.default.parse();
