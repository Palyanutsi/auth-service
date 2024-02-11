import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get(':id')
    async findById (@Param('id') id: string): Promise<void> {
        console.log()
    }
}
