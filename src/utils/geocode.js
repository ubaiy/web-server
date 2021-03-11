const request = require('request')

const geocode = (address, callback) =>{
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidWJhaXlwYXRyYXdhbGEiLCJhIjoiY2ttMXpueDJzMXh4eTJucno5Z2NoaWpudiJ9.ynvLl5_NMZ1LoiSr1bvitg&limit=1'
    request({url, json:true}, (error,{ body }) =>{
            if(error){
                callback('Unable to connect to location services',undefined)
            }else if(body.features.length === 0){
                callback('Unable to find location', undefined)
            }else{
                callback(undefined,{
                    long: body.features[0].center[1],
                    latitude: body.features[0].center[0],
                    Placename: body.features[0].place_name
                }
            )
               

            }
    })
}

module.exports = geocode