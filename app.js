require('dotenv').config()
const movies = require('./movies')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const app = express()


app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    console.log('validate bearer token middleware')
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
        }
    next()
    });

app.get('/movie', (req, res) => {
    const {genre, country, avg_vote} = req.query;
    let results = movies;
    const vote = parseFloat(avg_vote);

    if (!genre) {
        results=results;
    }
    if (!country) {
        results=results;
    }
    if (!avg_vote) {
        results=results;
    }
    
    if(avg_vote && Number.isNaN(vote)) {
        return res
        .status(400)
        .send('avg_vote must be a number')
    }

    if(genre) {
        results = results.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    }

    if(country) {
        results = results.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()));
    }

    if(vote) {
        results = results.filter(movie => movie.avg_vote >= vote)
    }

    res
    res.json(results)

})
    
    app.listen(8080, () => {
        console.log('listening on 8080')
    });
 

