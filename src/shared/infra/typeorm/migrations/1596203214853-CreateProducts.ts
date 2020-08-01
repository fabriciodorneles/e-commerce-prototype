import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1596203214853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // BD: 'products' : id, name, price, quantity, created_at, updated_at.

        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 9,
            scale: 2,
            isUnique: true,
          },
          {
            name: 'quantity',
            type: 'decimal',
            isUnique: true,
          },
          {
            name: 'orders_products',
            type: '',
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
