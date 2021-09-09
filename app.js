const i18nextMiddleware = require('i18next-express-middleware');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const i18next = require('i18next');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const keys = require('./config/keys');
const enTranslations = require('./locales/en.json');
const elTranslations = require('./locales/el.json');

const app = express();

i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(FilesystemBackend)
    .init({
        detection: {
            order: ['querystring', 'cookie'],
            caches: ['cookie']
        },
        preload: ['en', 'el'],
        fallbackLng: 'en',
        debug: false,
        resources: {
            en: enTranslations,
            el: elTranslations,
        },
        saveMissing: true
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18nextMiddleware.handle(i18next));

// TODO Add cookies

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
