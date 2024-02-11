import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { Prisma, Users } from '@prisma/client'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {}

    async signUp(data: Prisma.UsersCreateInput): Promise<{accessToken: string, refreshToken: string}> {
        const isUserExist = await this.userService.find({email: data.email})

        if (isUserExist) {
            throw new BadRequestException('User already exists')
        }

        const hash = await this.hashData(data.password);
        const newUser = await this.userService.create({
            ...data,
            password: hash,
        })

        const tokens = await this.getTokens(newUser.id, newUser.username)
        await this.updateRefreshToken(newUser.id, tokens.refreshToken)

        return tokens
    }

    async signIn(data: Prisma.UsersCreateInput): Promise<{accessToken: string, refreshToken: string}> {
        const user = await this.userService.find({email: data.email})

        if (!user) {
            throw new BadRequestException('User does not exist')
        }

        const passwordMatches = await argon2.verify(user.password, data.password)

        if (!passwordMatches) {
            throw new BadRequestException('Incorrect credentials')
        }

        const tokens = await this.getTokens(user.id, user.username)
        await this.updateRefreshToken(user.id, tokens.refreshToken)
        return tokens
    }

    async logout(id: number): Promise<Users>  {
        return this.userService.update(id, null)
    }

    async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
        const hashedRefreshToken = await this.hashData(refreshToken)
        await this.userService.update(id, hashedRefreshToken)
    }

    hashData(data: string): Promise<string> {
        return argon2.hash(data)
    }

    async getTokens(userId: number, username: string): Promise<{accessToken: string, refreshToken: string}> {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '15m',
            },
          ),
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ])
    
        return {
          accessToken,
          refreshToken,
        }
      }
}
