require('dotenv').config()
const express = require('express');
const db = require('./config/db')

const PORT = process.env.PORT

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CWSMS Server is running')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});