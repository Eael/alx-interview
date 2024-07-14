#!/usr/bin/node
const request = require('request');
const API_LINK = 'https://swapi-api.alx-tools.com/api/';

if (process.argv.length > 2) {
  request(`${API_LINK}/films/${process.argv[2]}/`, (err, _, body) => {
    if (err) {
      console.log(err);
    }
    const charURL = JSON.parse(body).characters;
    const charName = charURL.map(
      url => new Promise((resolve, reject) => {
        request(url, (promiseErr, _, charReqBody) => {
          if (promiseErr) {
            reject(promiseErr);
          }
          resolve(JSON.parse(charReqBody).name);
        });
      }));

    Promise.all(charName)
      .then(names => console.log(names.join('\n')))
      .catch(allErr => console.log(allErr));
  });
}
