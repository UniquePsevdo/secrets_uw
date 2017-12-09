import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone-node';
import * as path from 'path';
/*require('import-export');*/

import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as apiRouter from './apiRoutes/apiRouter';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as i18n from 'i18n';

import { notFound, developmentErrors, productionErrors } from './handlers/errorHandlers';

i18n.configure({
    locales: ['ua', 'en'],
    directory: path.join(process.cwd(), 'src', 'assets', 'locales'),
    defaultLocale: 'ua',
});

// db setup
mongoose.connect('mongodb://VolodymyrSydorov:My_1ntent10ns@ds143191.mlab.com:43191/the_secrets');

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
// app setup
app.use(morgan('combined'));
app.use(i18n.init);

const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

const {AppServerModuleNgFactory} = require('./lib/src/app/app.server.module.ngfactory');

const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
        document: template,
        url: options.req.url,
    }).then(html => {
        callback(null, html);
    });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
app.use('/api/', apiRouter);

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));


// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
});

let whitelist = ['http://localhost:4200', 'http://localhost:8000', 'http://localhost:4000', 'http://localhost:3090'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));
app.use(bodyParser.json({type: '*/*'}));

app.use(notFound);
if (process.env.NODE_ENV === 'development') {
    app.use(developmentErrors);
} else {
    app.use(productionErrors);
}

// Start up the Node server
const PORT = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Server is listening on port: ' + PORT);
});

