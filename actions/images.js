const fs = require('fs');

module.exports = {
    determineRooms: (route, rooms, res) => {
        let images = [];

        try {
            if (rooms.length === 1) {
                images = fs.readdirSync(`./public/images/indoors/${rooms[0]}`);
            } else {
                rooms.forEach(room => images.push(fs.readdirSync(`./public/images/indoors/${room}`)));
            }
            return res.render(`rooms/${route}`, {rooms: rooms, images: images});
        } catch {
            return res.render(`rooms/${route}`, {route: route, images: false});
        }
    }
};
