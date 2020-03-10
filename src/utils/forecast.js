const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    url = 'https://api.darksky.net/forecast/c082232a7f35abce244fdad2f68150df/'+latitude+','+longitude+''

    request({url, json:true},(error, { body})=>{
        if(error){
            callback('Unable to connect weather services',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+
                ' degrees out. There is a '+body.currently.precipProbability+' % chances of rain')
        }
    })
}

module.exports= forecast