const fs = require('fs');

module.exports = {
    determineRooms: (route, rooms, res) => {
        let images = [];

        try {
            rooms.forEach(room => images.push(fs.readdirSync(`./public/images/indoors/${room}`)));

            return res.render(`rooms/${route}`, {rooms: rooms, images: images});
        } catch {
            return res.render(`rooms/${route}`, {route: route, images: false});
        }
    }
};
