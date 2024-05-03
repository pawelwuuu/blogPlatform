/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1,nickname: 'test', password: 'test'},
          {id: 2,nickname: 'Anna Nowak', password: 'has'}
        ]);
      });
};
