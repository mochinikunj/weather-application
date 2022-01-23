const request = require('postman-request');

const geocode = (address, callback) => {
    const place = encodeURIComponent(address);

    const apiKey = process.env.geocode_API_KEY;
    const apiURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${apiKey}&limit=1`;
    
    request({ url: apiURL, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to geocoding service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;