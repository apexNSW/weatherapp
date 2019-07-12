const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const weatherMessage = ({dailysummary, currentconditions, temperature, pricipitation, temperatureHigh, temperatureLow, humidity}) => 'Today: ' + dailysummary + '<br />Current Conditions: ' + currentconditions + ', with a temperature of ' + temperature + ' and ' + pricipitation + '% chance of pricipitation.<br />High Temp: ' + temperatureHigh + '<br />Low Temp: ' + temperatureLow + '<br />Humidity: ' + humidity

//express config paths
const publicpath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup hadlebars view and view path
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Nick'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Nick'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        message:'Here\'s a tip, FUCK YOU!',
        name:'Nick'
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must supply a location.'
        })
    }
    geocode(req.query.address, (error,{location,latitude,longitude} = {}) => {

        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error,data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forcast:data,
                location,
                address: req.query.address,
                message: weatherMessage(data)
            })
        })
    })
})
app.get('/help/*',(req,res) => {
    res.render('error',{
        title: 'Help Error',
        name: 'Nick',
        errormsg: 'Help article not found.'
    })
})
app.get('*', (req,res) => {
    res.render('error',{
        title: 'Error 404 Not Found',
        name: 'Nick',
        errormsg: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server started on port '+ port)
})