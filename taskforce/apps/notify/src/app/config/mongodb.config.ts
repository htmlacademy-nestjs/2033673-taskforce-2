import { ConfigService, registerAs } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoDbConnectionString } from '@taskforce/core';

export const mongodbOptions = registerAs('database', () => ({
  name: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT, 10),
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  authBase: process.env.MONGO_AUTH_BASE,
}));

export function getMongodbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoDbConnectionString({
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        authDatabase: configService.get<string>('database.authBase'),
        databaseName: configService.get<string>('database.name'),
      }),
    }),
    inject: [ConfigService],
  };
}
