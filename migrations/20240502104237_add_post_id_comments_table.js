exports.up = function(knex) {
    return knex.schema.table('comments', function(table) {
        table.integer('postId')
    });
};

exports.down = function(knex) {
    return knex.schema.table('comments', function(table) {
        table.dropColumn('postId'); // Usuń kolumnę email podczas wycofywania migracji
    });
};