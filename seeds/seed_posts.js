const faker = require('faker');

exports.seed = async function(knex) {
  await knex('posts').del();


  const fakePosts = [];
  const numberOfPosts = 13;

  for (let i = 0; i < numberOfPosts; i++) {
    fakePosts.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      userId: faker.datatype.number({ min: 1, max: 10 })
    });
  }


  await knex('posts').insert(fakePosts);
};