import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateGameRating1713663421048 implements MigrationInterface {
    name = "CreateGameRating1713663421048";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "game",
            "isDeleted",
            new TableColumn({ name: "isDeleted", type: "bool", default: false })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "game",
            "isDeleted",
            new TableColumn({ name: "isDeleted", type: "bool" })
        );
    }
}
