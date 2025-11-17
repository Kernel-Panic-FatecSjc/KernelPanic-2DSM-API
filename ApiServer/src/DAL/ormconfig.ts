import "reflect-metadata"; // necessário para TypeORM
import { DataSource } from "typeorm";
import { join } from "path";
import dotenv from "dotenv";

// Carrega as variáveis do .env
dotenv.config();

// Configurações do banco a partir do .env
const host = process.env.DB_HOST || "127.0.0.1";
const port = Number(process.env.DB_PORT) || 3306;
const username = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "root";
const database = process.env.DB_DB || "newe_database";

// Exporta a instância do DataSource do TypeORM
export const AppDataSource = new DataSource({
  type: "mysql",
  host,
  port,
  username,
  password,
  database,
  entities: [join(__dirname, "./Models/*.{ts,js}")],
  migrations: [join(__dirname, "./Migrations/*.{ts,js}")],
  subscribers: [join(__dirname, "./Subscribers/*.{ts,js}")],
  synchronize: false, // nunca use true em produção, ajusta somente se quiser criar tabelas automaticamente
  logging: true,
});


// Comandos úteis:

// Gerar nova migration com base nas entidades atuais (apontando para arquivo JS compilado):
//// npx typeorm migration:generate src/DAL/migrations/PrimeiraMigration -d dist/DAL/ormconfig.js

// Compilar o TypeScript para JavaScript (gera a pasta dist):
//// npx tsc

// Rodar as migrations no banco usando o arquivo JS compilado:
//// npx typeorm migration:run -d dist/DAL/ormconfig.js

// Mostrar o log das alterações que o TypeORM faria no schema:
//// npx typeorm schema:log -d dist/DAL/ormconfig.js
