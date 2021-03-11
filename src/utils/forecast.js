const request = require('request')

const forecast = (long,latitude, callback) =>{
    var url = 'http://api.weatherstack.com/current?access_key=4f4e9e793d99ac498573e89fc6289481&query='+ latitude + ',' + long
    request({url, json:true}, (error,{ body }) =>{
        if(error){
            debugger
            callback('Unable to connect to location services',undefined)
        }else if(body.error){
            debugger
            callback('Unable to find location', undefined)
        }else{
            debugger
             callback(undefined,body.location.localtime +  body.current.weather_descriptions[0] +'. '+ 'Its Currently '+body.current.temperature+' out. It feels like '+body.current.feelslike+' degress out. ')
        }
    })
}

module.exports = forecast