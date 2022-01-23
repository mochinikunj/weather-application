const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const apiKey = 'bc56d986f4ca66c9353d9310af1cdf24';
    const apiURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${long}&units=m`;

    request( { url: apiURL, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            const data = body.current;
            const msgToUser = `${data.weather_descriptions[0]}: It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} out. The humidity is ${data.humidity}%.`;
            
            callback(undefined, msgToUser);
        }
    });
};

module.exports = forecast;