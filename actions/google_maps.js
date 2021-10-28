const https = require('https');
const fs = require('fs');

const {maps_url} = require('../config/keys');

module.exports = {
    getReviews: () => {
        const xhr = {};

        https.get(maps_url, res => {
            xhr.statusCode = res.statusCode;
            xhr.reviews = [];

            res.setEncoding('utf8');
            let rawData = '';

            res.on('data', chunk => rawData += chunk);

            res.on('end', () => {
                try {
                    const data = JSON.parse(rawData);
                    const reviews = data.result.reviews;

                    for (let i = 0; i < 3; i++) {
                        if (reviews[i].rating >= 4) {
                            xhr.reviews.push({
                                name: reviews[i].author_name,
                                photo: reviews[i].profile_photo_url,
                                rating: reviews[i].rating,
                                text: reviews[i].text,
                                relativeTime: reviews[i].relative_time_description,
                            });
                        }
                    }
                } catch (e) {
                    console.error(e.message);
                }

                const data = JSON.stringify(xhr);

                fs.writeFile('./data/reviews.json', data, 'utf8', err => {
                    if (err) console.log(`Error writing file: ${err}`);
                });
            });
        }).on('error', (e) => {
            console.error(e);
        });
    }
};