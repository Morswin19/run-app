const express = require('express');
const path = require('path');
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
app.use('/api/goals', require('./routes/goalRoutes'))

// Serve frontend
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server startet on port ${port}`))