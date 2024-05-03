/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('posts', function(table) {
        table.integer('userId').alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('posts', function(table) {
        table.string('userId').alter();
    });
};