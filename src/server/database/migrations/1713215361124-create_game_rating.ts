import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameRating1713215361124 implements MigrationInterface {
    name = 'CreateGameRating1713215361124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar(128) NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(128) NOT NULL, CONSTRAINT "UQ_5d1e08e04b97aa06d671cd58409" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "user_game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "userId" integer, "gameId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_user_game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "userId" integer, "gameId" integer, CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_efca7c34243bd941b730135e2c0" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_game"("id", "rating", "userId", "gameId") SELECT "id", "rating", "userId", "gameId" FROM "user_game"`);
        await queryRunner.query(`DROP TABLE "user_game"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_game" RENAME TO "user_game"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" RENAME TO "temporary_user_game"`);
        await queryRunner.query(`CREATE TABLE "user_game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "userId" integer, "gameId" integer)`);
        await queryRunner.query(`INSERT INTO "user_game"("id", "rating", "userId", "gameId") SELECT "id", "rating", "userId", "gameId" FROM "temporary_user_game"`);
        await queryRunner.query(`DROP TABLE "temporary_user_game"`);
        await queryRunner.query(`DROP TABLE "user_game"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
