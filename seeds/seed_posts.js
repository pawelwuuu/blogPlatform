/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {id: 1, title: 'Zależność w cenach zboża', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum turpis elit, nec interdum sem volutpat vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque laoreet erat eu ex ullamcorper condimentum. Nulla sem lectus, hendrerit et finibus ac, euismod eget orci. Donec nec magna pulvinar ex interdum rhoncus at at ligula. Quisque magna purus, vulputate a purus at, lobortis porttitor ante. Nulla facilisi.\n' +
          '\n' +
          'Phasellus quis nunc non dolor luctus bibendum. Nam tempus scelerisque nunc, in molestie libero congue nec. Mauris commodo arcu nec augue luctus pellentesque. Praesent cursus placerat faucibus. Integer gravida, mauris eu pharetra mollis, neque ante placerat dolor, nec vestibulum libero risus eu neque. Suspendisse eget dui erat. Pellentesque justo nisi, sagittis vitae mi eu, pharetra consectetur ante. Quisque eleifend magna a purus hendrerit accumsan. Aenean iaculis urna eget dui aliquam, sed rhoncus sapien efficitur. Praesent bibendum mauris vitae semper mattis. Etiam nulla felis, fermentum id ipsum quis, mollis pellentesque libero. Mauris eleifend malesuada sem sit amet venenatis. Curabitur libero sapien, mattis at viverra vel, scelerisque ut tortor. Nunc ac vehicula purus, sollicitudin aliquam ex. Integer laoreet, nunc sit amet pharetra gravida, mi lectus blandit felis, sed congue nunc orci eu nulla.', userId: '1'},
    {id: 2, title: 'Jak poprawnie odejmować', content: 'Lorem ipsum dolor sit amet, consectetu Phasellus quis nunc non dolor luctus bibendum. Nam tempus scelerisque nunc, in molestie libero congue nec. Mauris commodo arcu nec augue luctus pellentesque. Praesent cursus placerat faucibus. Integer gravida, mauris eu pharetra mollis, neque ante placerat dolor, nec vestibulum libero risus eu neque. Suspendisse eget dui erat. Pellentesque justo nisi, sagittis vitae mi eu, pharetra consectetur ante. Quisque eleifend magna a purus hendrerit accumsan. Aenean iaculis urna eget dui aliquam, sed rhoncus sapien efficitur. Praesent bibendum mauris vitae semper mattis. Etiam nulla felis, fermentum id ipsum quis, mollis pellentesque libero. Mauris eleifend malesuada sem sit amet venenatis. Curabitur libero sapien, mattis at viverra vel, scelerisque ut eu nulla.', userId: '2'},
  ]);
};
