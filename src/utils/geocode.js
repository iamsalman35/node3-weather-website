const request = require('request')

//Callback Function for the above operation for better reusability of code; incorporate callback abstraction
//Reference : 4-callback.js in main directory

const geocode = (address, callback) => {
    const LL_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FsbWFuYXNpZiIsImEiOiJja3R0bzV3MW0wMnE4MnVteDg3YXc0czlmIn0.qAMq2vv-CJEtydZC4tJbnw&limit=1'

    request({ url: LL_url, json: true }, (error, response) => {
        if (error) {
            callback('Error Connecting to Location Services.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Invalid Location. Try with a different location.', undefined)
        } else {
            callback(undefined, {
                Latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                Location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode