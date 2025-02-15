// Можно удалить, это просто для теста

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService) {}

    async create(name: string) {
        return this.prisma.test.create({ data: { name } });
    }
    async give() {
        return this.prisma.test.findMany();
    }
}
