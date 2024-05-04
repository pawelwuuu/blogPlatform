const faker = require('faker');

exports.seed = async function(knex) {
    await knex('users').del()


    const fakeUsers = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        nickname: faker.internet.userName(),
        password: faker.internet.password()
    }));


    await knex('users').insert(fakeUsers);
    await knex('users').insert({nickname: 'test', password: 'test'})
};
