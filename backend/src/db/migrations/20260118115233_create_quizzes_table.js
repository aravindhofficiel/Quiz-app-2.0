export async function up(knex) {
  await knex.schema.createTable('quizzes', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table
      .integer('created_by')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('quizzes');
}
