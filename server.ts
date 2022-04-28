const dataBase = require('./db');
const request = require('request-promise');

interface GithubUsers {
    id: number
};

dataBase.any('CREATE TABLE IF NOT EXISTS github_users (id BIGSERIAL, login TEXT UNIQUE, name TEXT, company TEXT, url TEXT)')
    .then(() => request({
        uri: 'https://api.github.com/users/gaearon',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    }))
    .then((data: GithubUsers) => dataBase.one(
        'INSERT INTO github_users (login, name, company, url) VALUES ($[login],$[name],$[company],$[url]) RETURNING id', data)
    ).then(({id}) => console.log(id))
    .then(() => process.exit(0))
