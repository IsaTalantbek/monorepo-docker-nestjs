import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
    @Get()
    ff() {
        return 'hello world';
    }
}
