const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicdirpath = path.join(__dirname, '../public')
const views = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(partials)

// Setup static dir to serve
app.use(express.static(publicdirpath))

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
             error: 'You must provide address!'
         })
     }
     geocode(req.query.address, (error, {latitude,long,Placename} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, long, (error, forecastdata) =>{
            if(error){
                return res.send({ error })
            }
            res.send({
              location : Placename,
              Forecast :  forecastdata,
              Address : req.query.address
            })
           
        })
    })
    //  res.send({
    //      address: req.query.address
    //  })
})

app.get('/products',(req, res) =>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'HELP',
        msg: 'This Page is for help perpose',
        name: 'Andrew'
    })
})

app.get('/help/*',(req, res)=>{
        res.render('',{
            title: '404',
            name:'Andrew',
            errormessage: 'Help articale not found'
        })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead'
    })  
   
})

app.get('*',  (req, res) =>{
    res.render('',{
        title: '404',
        name:'Andrew',
        errormessage: 'Page Not Found'
    })
})

// app.com
app.listen(port, () => {
    console.log('Server is up on port' + port)
})