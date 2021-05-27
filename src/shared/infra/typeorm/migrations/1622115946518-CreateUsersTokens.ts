import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTokens1622115946518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_tokens",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "token",
            type: "varchar",
            default: 'uuid_generate_v4()'
          },
          {
            name: "created_at",
            type: "timestamp",
            default: 'now()'
          },
        ],
        foreignKeys: [
          {
            name: "FKUserUsersTokens",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_tokens");
  }
}
