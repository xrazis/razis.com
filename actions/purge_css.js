const {PurgeCSS} = require('purgecss')
const fs = require('fs');

module.exports = {
    purgeCSS: async () => {
        let CSS = [
            ...fs.readdirSync(`./public/styles`).map(item => `./public/styles/${item}`),
            ...fs.readdirSync(`./public/assets/css`).map(item => `./public/assets/css/${item}`)
        ];
        let purgedCSSOld = CSS.filter(value => value.includes('purged'));

        purgedCSSOld.forEach(item => {
            fs.unlink(item, err => {
                if (err) console.log(`Error deleting file: ${err}`);
            });
        });

        const purgeCSSResult = await new PurgeCSS().purge({
            content: ['**/*.ejs'],
            css: ['**/*.css'],
            safelist: {
                standard: [/choices/, /flatpickr/],
                deep: [/choices/, /flatpickr/],
                greedy: [/choices/, /flatpickr/]
            },
            skippedContentGlobs: ['public/libs/**']
        });

        purgeCSSResult.forEach(item => {
            const filename = item.file.replace('.css', '.purged.css');
            fs.writeFile(filename, item.css, 'utf8', err => {
                if (err) console.log(`Error writing file: ${err}`);
            });
        });
    }
};
