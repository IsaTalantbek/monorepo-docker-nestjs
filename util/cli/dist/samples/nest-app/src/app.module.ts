import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BasePackModule } from './base.pack.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { AppService } from './test/app.service';
import { AppController } from './test/app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        BasePackModule,
        PrismaModule // Удалите, это только для AppService и AppController, тоесть для тестов
    ],
    controllers: [AppController], // Можно удалить
    providers: [AppService] // Можно удалить
})
export class AppModule {}
