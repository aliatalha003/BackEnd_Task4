let form = document.getElementById("form1")
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const latitudeF = document.getElementById('latitude')
const longitudeF = document.getElementById('longitude')
const heading = document.getElementById('heading')
const forecastF = document.getElementById('forecast')




locationF.style.display = "none";
latitudeF.style.display = "none";
longitudeF.style.display = "none";
forecastF.style.display = "none";
errorF.style.display = "none";

form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFunction()
    form.reset()

})

let weatherFunction = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        // console.log(data)

        heading.style.display = "none";

        if (data.error) {
            locationF.style.display = "none";
            latitudeF.style.display = "none";
            longitudeF.style.display = "none";
            forecastF.style.display = "none";
            errorF.style.display = "block";

            errorF.innerText = data.error
            locationF.innerText = ""
            latitudeF.innerText = ""
            longitudeF.innerText = ""
            forecastF.innerText = ""
          

        }
        else {
            // console.log(data)
            locationF.style.display = "block";
            latitudeF.style.display = "block";
            longitudeF.style.display = "block";
            forecastF.style.display = "block";
            errorF.style.display = "none";
            locationF.innerText = "Country is " + data.location
            latitudeF.innerText = "Latitude is: " + data.latitude
            longitudeF.innerText = "Longitude is: " + data.longitude
            forecastF.innerText = data.forecast
            errorF.innerText = ""
        }
    }
    catch (error) {
        console.log(error)
    }
}
