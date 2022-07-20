const fs = require('fs');
const sizeOf = require('image-size');

module.exports = {
    determineRooms(route, rooms, res) {
        let images = [];

        try {
            rooms.forEach(room => {
                let roomImages = [];

                fs.readdirSync(`./public/images/indoors/${room}`).forEach(image => {
                    const dimensions = sizeOf(`./public/images/indoors/${room}/${image}`);
                    roomImages.push({name: image, width: dimensions.width, height: dimensions.height});
                });

                images.push(roomImages);
            });

            return res.render(`rooms/${route}`, {rooms: rooms, images: images});
        } catch {
            return res.render(`rooms/${route}`, {route: route, images: false});
        }
    },
    getImagesFromDirs(dirs) {
        let images = [];

        try {
            dirs.forEach(dir => {
                fs.readdirSync(`./public/images/${dir}`).forEach(image => {
                    const dimensions = sizeOf(`./public/images/${dir}/${image}`);
                    images.push({name: `${dir}/${image}`, width: dimensions.width, height: dimensions.height});
                });
            });

            return images;
        } catch {
            return images;
        }
    }
};
