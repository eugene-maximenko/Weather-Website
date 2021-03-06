const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();
const port = process.env.PORT || 3000;

// Define pathes for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Root route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eugene Maximenko'
    });
});

// About route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Eugene Maximenko'
    })
})

// Help route
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'If you have any questions or suggestions, please contact me at zhek4770@gmail.com.',
        title: 'Help',
        name: 'Eugene Maximenko'
    })
})

// Weather route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please, provide an address!'
        })
    }

    // Geocode input
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        // Get forecast
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                latitude,
                longitude,
                address: req.query.address
            })

        });
    })
});

// Products route
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

// Help route
app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

// Any other page route
app.get('*', (req, res) => {
    // res.send('My 404 page');
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
});

// Listen ot port
app.listen(port, () => {
    console.log(`Server is up on ${port}.`);
});