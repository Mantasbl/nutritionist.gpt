import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715145019633 implements MigrationInterface {
  name = 'Migration1715145019633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message" ("id" SERIAL NOT NULL, "text" text NOT NULL, "sender" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "conversation_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "filled_initial_survey" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "conversation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" ADD CONSTRAINT "FK_0825886afb03b1a6f11345b4e8c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_0825886afb03b1a6f11345b4e8c"`);
    await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2"`);
    await queryRunner.query(`DROP TABLE "conversation"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "message"`);
  }
}
