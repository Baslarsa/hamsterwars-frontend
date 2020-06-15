const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;   // RÄTT

require('dotenv').config()

app.use(cors()); //Förhindra problem med CORS
app.use(express.json());
app.use(express.static(__dirname + '/../build'));

//Authorize med API KEY
app.use((req, res, next) => {
    let reqKey = req.headers['authorization'];

    if (req.url === '/') {
        next();

    } else {
        if (reqKey === process.env.API_KEY) {
            console.log('API OK');
            next();
        } else {
            res.status(400).send({ msg: 'API-KEY NOT OK' })
        }
    }
})

//Set routes
const assetsRoute = require('./routes/assets')
app.use('/api/assets', assetsRoute)

const hamstersRoute = require('./routes/hamsters')
app.use('/api/hamsters', hamstersRoute);

const chartsRoute = require('./routes/charts')
app.use('/api/charts', chartsRoute);

const gamesRoute = require('./routes/games')
app.use('/api/games', gamesRoute);

const statsRoute = require('./routes/stats')
app.use('/api/stats', statsRoute);


//Sätt på öronen
app.listen(port, () => {
    console.log("Hamster server is up, and it's running!")
});