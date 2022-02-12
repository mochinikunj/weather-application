const request = require('postman-request');

const forecast = (lat: number, long: number, callback: any) => {
    const apiKey = process.env.forecast_API_KEY;
    const apiURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${long}&units=m`;

    request( { url: apiURL, json: true }, (err: string, { body }: any) => {
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

export { forecast };