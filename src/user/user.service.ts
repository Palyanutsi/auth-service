import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Users, Prisma } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private dbService: DbService) {

    }
    // TODO: DTO
    async create(data: Prisma.UsersCreateInput): Promise<Users> {
        const user = await this.dbService.users.create({
            data
        })

        return user
    }

    async update(id: number, refreshToken: string): Promise<Users> {
        const user = await this.dbService.users.update({where: { id }, data: {
            refreshToken
        }})

        return user
    }

    async find(userWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
        const user = await this.dbService.users.findUnique({
            where: userWhereUniqueInput
        })

        return user
    }

    async delete(userWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users> {
        return await this.dbService.users.delete({ where: userWhereUniqueInput })
    }
}
