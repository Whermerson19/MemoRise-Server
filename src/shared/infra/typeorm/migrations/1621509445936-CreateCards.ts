import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCards1621509445936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cards",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "varchar",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "deck_id",
            type: "varchar",
          },
          {
            name: "front",
            type: "varchar",
          },
          {
            name: "versus",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKDeckCards",
            referencedTableName: "decks",
            referencedColumnNames: ["id"],
            columnNames: ["deck_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cards");
  }
}
