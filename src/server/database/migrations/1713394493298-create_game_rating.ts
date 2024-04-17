import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateGameRating1713394493298 implements MigrationInterface {
    name = "CreateGameRating1713394493298";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "game",
            new TableColumn({ name: "isDeleted", type: "bool" })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("game", "isDeleted");
    }
}
