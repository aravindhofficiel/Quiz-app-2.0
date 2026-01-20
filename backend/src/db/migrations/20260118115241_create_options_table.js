export async function up(knex) {
  await knex.schema.createTable('options', (table) => {
    table.increments('id').primary();
    table
      .integer('question_id')
      .unsigned()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE');
    table.string('option_text').notNullable();
    table.boolean('is_correct').defaultTo(false);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('options');
}
