const express = require("express")
const app = express()
const path = require("path")

const port = process.env.PORT || 3000
//To configure template engine
app.use(express.static('public'));
app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, '../temp1/views')
app.set("views", viewsDirectory)


app.get('/', (req, res) => {
    res.render('index', {})
})
app.listen(port, () => {
    console.log("App is listening on port 3000")
})

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address,
                longitude:data.longitude,
                latitude:data.latitude

            })
        })
    })
})


