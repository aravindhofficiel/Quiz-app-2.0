export async function up(knex) {
  await knex.schema.createTable('answers', (table) => {
    table.increments('id').primary();
    table
      .integer('attempt_id')
      .unsigned()
      .references('id')
      .inTable('attempts')
      .onDelete('CASCADE');
    table
      .integer('question_id')
      .unsigned()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE');
    table
      .integer('selected_option_id')
      .unsigned()
      .references('id')
      .inTable('options')
      .onDelete('CASCADE');
    table.boolean('is_correct').notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('answers');
}
