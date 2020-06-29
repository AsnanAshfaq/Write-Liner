const express = require('express')
const mongoose = require('mongoose')

//importing routes
const blogRoutes = require('./Routes/blogRoutes')

const app = express()

const port = 3000

//connection String
const dbURI = 'mongodb+srv://Asnan:Asnan@wrtieliner.lfkei.mongodb.net/WriteLiner?retryWrites=true&w=majority'

//connecting to mongoDB
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
    if(error != null)console.log(error)
})

//setting view engine
app.set('view engine', 'ejs')

//middleware for serving static files
app.use( express.static ('public'))

//home path
app.get('/', (req, res) => {
    res.redirect('/blogs')
})


//about path
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Write Liner | About Us'
    })
})


//middleware for  Routes
app.use(blogRoutes)

//middleware for 404 error
app.use((request, response) => {
    response.status(404).render('404', {
        title: '404 Error'
    })
})

app.listen(port, () => console.log(`listening on port ${port}`))