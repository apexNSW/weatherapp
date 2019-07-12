const request = require('request')

const geocode = (address, callback) => {
    const mapendpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXBleG5zdyIsImEiOiJjanh5NGVkdWgwNmlrM2dtb3Zpano1dXFuIn0.uHXMgvA0r4r_k0mQWl4_tw&limit=1'
    request({url:mapendpoint,json:true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to connection services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.',undefined)
        } else {
            callback(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            })
        }
    })
}
module.exports = geocode