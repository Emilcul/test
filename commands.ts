const commander = require('commander');
const database = require('./db.js');

commander.program
  .version('1.0.0.0');

commander.program.command('find')
  .description('Find user in db')
  .argument('<string>', 'user name')
  .action(async userName => {
    const user = await database.query('SELECT * FROM github_users WHERE login = $1 LIMIT 1', userName)
    console.log('user', user)
  });

commander.program.command('users')
  .description('list all users')
  .action(async () => {
    const users = await database.query('SELECT * FROM github_users')
    console.log('users', users)
  });

commander.program
  .parse(process.argv);
