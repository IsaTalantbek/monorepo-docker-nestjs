// Можно удалить, это просто для теста

import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
    constructor(private readonly service: AppService) {}

    @Post(':name')
    async create(@Param('name') name: string) {
        return this.service.create(name);
    }
    @Get('name')
    async give() {
        return this.service.give();
    }
}
