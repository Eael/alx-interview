#!/usr/bin/node
const request = require('request');
const API_LINK = 'https://swapi-api.alx-tools.com/api';

if (process.argv.length > 2) {
  const filmId = process.argv[2];
  const filmUrl = `${API_LINK}/films/${filmId}/`;

  request(filmUrl, (err, _, body) => {
    if (err) {
      console.log('Error fetching film:', err);
      return;
    }

    let filmData;
    try {
      filmData = JSON.parse(body);
    } catch (parseErr) {
      console.log('Error parsing film data:', parseErr);
      return;
    }

    const charURLs = filmData.characters;
    const charPromises = charURLs.map(url =>
      new Promise((resolve, reject) => {
        request(url, (charErr, __, charBody) => {
          if (charErr) {
            reject(charErr);
          } else {
            try {
              const charData = JSON.parse(charBody);
              resolve(charData.name);
            } catch (parseErr) {
              reject(parseErr);
            }
          }
        });
      })
    );

    Promise.all(charPromises)
      .then(names => console.log(names.join('\n')))
      .catch(allErr => console.log('Error fetching characters:', allErr));
  });
} else {
  console.log('Please provide a film ID as an argument.');
}
