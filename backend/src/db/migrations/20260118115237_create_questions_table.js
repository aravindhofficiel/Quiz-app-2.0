export async function up(knex) {
  await knex.schema.createTable('questions', (table) => {
    table.increments('id').primary();
    table
      .integer('quiz_id')
      .unsigned()
      .references('id')
      .inTable('quizzes')
      .onDelete('CASCADE');
    table
      .integer('teacher_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.text('question_text').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('questions');
}
