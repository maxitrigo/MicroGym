import { registerAs } from "@nestjs/config";

import { DataSource, DataSourceOptions } from "typeorm";
import { DB_DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } from "./env.config";

const config = {
    type: DB_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mariadb',
    host: DB_HOST,
    port: DB_PORT, // Cambia el puerto según tu base de datos
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true, // No usar en producción
    logging: false,
    migrationsRun: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
}

export const dataSource = new DataSource(config as DataSourceOptions)
export default registerAs('typeorm', () => config);