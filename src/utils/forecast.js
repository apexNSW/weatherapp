const request = require('request')

const forecast = (lat,long,callback) => {
    const apiendpoint = 'https://api.darksky.net/forecast/'
    const apikey = '60819e1fea276ccdd20fed31c5c51e5e'
    const endpoint = apiendpoint + apikey + '/'

    const location = lat + ',' + long
    const finalendpoint = endpoint+location
    const exclude = 'exclude=minutely,hourly,flags'
    request({url:finalendpoint + '?' + exclude,json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service.',undefined)
        } else if (body.error) {
            callback('Unable to find location.',undefined)
        } else {    
            callback(undefined,{
                dailysummary: body.daily.data[0].summary,
                currentconditions: body.currently.summary,
                temperature: body.currently.temperature,
                pricipitation: body.currently.precipProbability,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureLow: body.daily.data[0].temperatureLow,
                humidity: body.daily.data[0].humidity
            })
        }
    })
}

module.exports = forecast