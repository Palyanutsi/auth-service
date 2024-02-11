import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() data: Prisma.UsersCreateInput) {
        return this.authService.signUp(data)
    }

    @Post('signin')
    signin(@Body() data: Prisma.UsersCreateInput) {
        return this.authService.signIn(data)
    }

    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['sub'])
    }
}
