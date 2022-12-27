import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'

// initialize the App
const app = express()

// Use express middleware to connect to our application
// This set prefix of posts to all the routes: localhost:5000/posts
app.use('/posts', postRoutes)

// General setup
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

const CONNECTION_URL =
  'mongodb+srv://user01:test123456@technotesdb.7xvs5aq.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message))

mongoose.set('strictQuery', true) // Suggested by mongoose

// mongoose.set('useFindAndModify', false) // Is given some error
