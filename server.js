require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')

// database connection 
mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected'))

// middlewares
app.use(cors())
app.use(express.json())
app.use(fileUpload())

// routers 
const userRouter = require('./routes/user')
app.use('/api/user', userRouter)

const playRouter = require('./routes/play')
app.use('/api/play', playRouter)

const themeRouter = require('./routes/theme')
app.use('/api/theme', themeRouter)

const adminSchema = require('./routes/admin')
app.use('/admin', adminSchema)

const settingSchema = require('./routes/setting')
app.use('/setting', settingSchema)


// linking client 
const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(process.env.PORT || 3004, () => {
    console.log(`Postcam api is running on port ${process.env.PORT}`)
})