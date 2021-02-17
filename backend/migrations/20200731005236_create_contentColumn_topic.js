exports.up = function(knex) {
  return knex.schema.table('topics', function(table){
    table.text("content").notNullable().defaultTo('No content.')
  })
}

exports.down = function(knex) {
  return knex.schema.createTable('topics', function(table){
      table.dropTable('content')
  }) 
}
