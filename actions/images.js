const fs = require('fs');

module.exports = {
    determineRoute: (route, res) => {
        try {
            const images = fs.readdirSync(`./public/images/indoors/${route}`);
            return res.render(`rooms/${route}`, {route: route, images: images});
        } catch {
            return res.render(`rooms/${route}`, {route: route, images: false});
        }
    }
};
