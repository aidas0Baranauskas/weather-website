import request from "request";
import fetch from "node-fetch";

const url =
	"http://api.weatherstack.com/current?access_key=38a75f91f90f3de8ff6be6bdd51a040b&query=";

// const geocode = (address, callback) => {
//     const fullUrl = url + encodeURIComponent(address)

//     request({ url: url, json: true}, (error, {body}) => {
//         if(error){
//             callback('Unable to connect to location services', undefined)
//         } else if(!body.current){
//             callback('Unable to find location')
//         } else {
//             callback(undefined, {
//                 latitude: body.location.lat,
//                 longitude: body.location.lon,
//                 location: body.location.name + ' of ' + body.location.country + '. '
//             })
//         }
//     })

// }

const geocode = (address) => {
	const fullUrl = url + encodeURIComponent(address);

	// return fetch(fullUrl).then(res => {
	//     return res.json().then(jsonBody => {
	//         return {
	//             latitude: jsonBody.location.lat,
	//             longitude: jsonBody.location.lon,
	//             location: jsonBody.location.name + ' of ' + jsonBody.location.country + '. '
	//         }

	//     }).catch(err => {
	//         return 'error 1'
	//     })
	// }).catch(err => {
	//         return 'error 2'
	//     })

	return new Promise((resolve, reject) => {
		fetch(fullUrl).then((res) => {
            console.log(`We're in the  first res`);
            res.json().then((resJson) => {
                if (!resJson.current) {
                    reject("Did not find the queried location");
                }

                resolve({
                    latitude: resJson.location.lat,
                    longitude: resJson.location.lon,
                    location:
                        resJson.location.name +
                        " of " +
                        resJson.location.country +
                        ". ",
                });
            })
            .catch((err) => {
                console.log(`second catch`);
                console.log(err);
                reject("Failed to convert response to json");
            });
        })
        .catch((err) => {
            console.log("First catch - network");
            console.log(err);
            reject("Failed to contact the api");
        });
	});
};

export default geocode;
