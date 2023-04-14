const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const apiKey = process.env.REACT_APP_API_KEY

const app = express()
app.use(express.json())
app.use(cors())

const getDayOfTheYear = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now - start
    const oneDay = 1000 * 60 * 60 * 24
    const day = Math.floor(diff / oneDay)
    return day
}

app.get('/movies', async (req, res) => {
    const randomPage = Math.ceil(getDayOfTheYear() / 20)
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: randomPage,
                with_original_language: 'en'
            }
        })
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

// app.listen(4000, () => console.log('Up on 4000'))
module.exports = app