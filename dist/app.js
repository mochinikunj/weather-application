"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const hbs_1 = __importDefault(require("hbs"));
const geocode_1 = require("./utils/geocode");
const forecast_1 = require("./utils/forecast");
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Define paths for Express config
const publicDirectoryPath = path_1.default.join(__dirname + './../public');
const viewsPath = path_1.default.join(__dirname + './../templates/views');
const partialsPath = path_1.default.join(__dirname + './../templates/partials');
// Define hbs engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs_1.default.registerPartials(partialsPath);
// Setup directory to serve static content
app.use(express_1.default.static(publicDirectoryPath));
// Setting application routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nikunj Mochi'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nikunj Mochi'
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorText: 'No such help page found!',
        name: 'Nikunj Mochi'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        aboutMe: '',
        name: 'Nikunj Mochi'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please enter location' });
    }
    (0, geocode_1.geocode)(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ error: err });
        }
        (0, forecast_1.forecast)(latitude, longitude, (err, forecast) => {
            if (err) {
                return res.send({ error: err });
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            });
        });
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found!',
        errorText: 'No such page found!',
        name: 'Nikunj Mochi'
    });
});
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
