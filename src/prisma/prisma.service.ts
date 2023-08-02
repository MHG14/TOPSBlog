import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "postgresql://mhg14:SuPeRsEcReTpAsSwOrD@localhost:5433/TOPS?schema=public",
                }
            }
        })
    }
}
