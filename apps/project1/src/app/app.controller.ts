import { Controller, Get } from '@nestjs/common';
import { hello } from 'depen';

@Controller('app')
export class AppController {
    @Get()
    hello() {
        return hello('my');
    }
}
