const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setup Handlebars engine and views location(templates)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Salman Asif'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        name: 'Contact Us'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please Enter a Valid Address.'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        } else {

            forecast(data.Latitude, data.Longitude, (error, data) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({ data })
                }
            })
        }
    })
})



app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Error Code: 404',
        name: 'Help Article Not Found'
    })
})


// VVIQ -> The 404 section has to come at the last.
//This is because when a URL is triggered, execution begins from the top. It goes through all the
//routes declared through app.get(). Therefore, the last reamining app.get() contains the 404 setup



app.get('*', (req, res) => { // * denotes all routes except the above ones. (404 Page Setup)
    res.render('notFound', {
        title: 'Error Code: 404',
        name: 'Enter a valid URL'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})