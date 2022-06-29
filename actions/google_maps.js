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
                    xhr.status = data.status;

                    for (const review of reviews) {
                        if (review.rating >= 4) {
                            xhr.reviews.push({
                                name: review.author_name,
                                photo: review.profile_photo_url,
                                rating: review.rating,
                                text: review.text,
                                relativeTime: review.relative_time_description,
                            });
                        }

                        if (xhr.reviews.length >= 3) break
                    }
                } catch (e) {
                    console.error(e.message);
                }

                const data = JSON.stringify(xhr);

                if (xhr.status === 'OK') {
                    fs.writeFile('./data/reviews.json', data, 'utf8', err => {
                        if (err) console.log(`Error writing file: ${err}`);
                    });
                }
            });
        }).on('error', (e) => {
            console.error(e);
        });
    }
};
