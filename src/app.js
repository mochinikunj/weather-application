const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname + './../public');
const viewsPath = path.join(__dirname + './../templates/views');
const partialsPath = path.join(__dirname + './../templates/partials');

// Define hbs engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup directory to serve static content
app.use(express.static(publicDirectoryPath));

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
    
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ error: err });
        }
        
        forecast(latitude, longitude, (err, forecast) => {
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