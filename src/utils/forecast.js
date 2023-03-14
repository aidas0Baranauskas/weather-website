// import request from 'request'
import request from 'app/'

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=38a75f91f90f3de8ff6be6bdd51a040b&query=' +
    latitude + ',' + longitude

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (!body.current) {
            console.log('forecast else if error')
            callback('Unable to find location')
        } else {
            callback(undefined, 'Weather: ' + body.current.weather_descriptions[0] + '. Temperature: ' + body.current.temperature + ' C' + '. Precipitation: ' + body.current.precip + '%')
        }
    })
}

export default forecast