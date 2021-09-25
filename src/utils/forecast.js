const request = require('request')

//Callback Function for the above operation for better reusability of code; incorporate callback abstraction
//Reference : 4-callback.js in main directory

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9acbf7ac8527e9bf514f169643579545&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Error Connecting to Weather Services.', undefined)
        } else if (response.body.error)
            callback('Invalid Location. Try with a different location.', undefined)
        else {
            callback(undefined, {
                Location: response.body.location.name + ', ' + response.body.location.region + ', ' +
                    response.body.location.country,
                Weather_Conditions: response.body.current.weather_descriptions[0],
                Temperature: response.body.current.temperature + '℃',
                Feels_Like: response.body.current.feelslike + '℃',
                Precipitation: response.body.current.precip + ' mm'
            })
        }
    })
}

module.exports = forecast