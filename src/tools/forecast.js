const request=require("request")
const forecast = (latitude, longitude, callback)=>{
    const url = "https://api.weatherapi.com/v1/current.json?key=37f39c0668174e19ab500710242007&q=" + latitude + "," + longitude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect weather api service", undefined)
        }
        else if (response.body.error) {
            callback(response.body.error.message, undefined)
        }

        else {
            callback(undefined, response.body.location.name+ " it is "+ response.body.current.condition.text +
                 " and temperature is "+response.body.current.temp_c
             )
            
        }
    })
}

module.exports=forecast