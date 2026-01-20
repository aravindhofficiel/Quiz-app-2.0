export async function up(knex) {
  await knex.schema.createTable('attempts', (table) => {
    table.increments('id').primary();
    table
      .integer('quiz_id')
      .unsigned()
      .references('id')
      .inTable('quizzes')
      .onDelete('CASCADE');
    table
      .integer('student_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('score').notNullable();
    table.timestamp('submitted_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('attempts');
}
