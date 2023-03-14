import request from 'request'

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=38a75f91f90f3de8ff6be6bdd51a040b&query=' +
    encodeURIComponent(address)

    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(!body.current){
            callback('Unable to find location')
        } else {
            callback(undefined, {
                latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name + ' of ' + body.location.country + '. '
            })
        }
    })

}

export default geocode