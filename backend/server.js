const express = require('express');
const dotenv = require('dotenv').config();
const color = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB();

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// middlewareEnd

app.use('/api/runs', require('./routes/runRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server startet on port ${port}`))