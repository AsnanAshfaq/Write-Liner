const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

//importing routes
const blogRoutes = require('./Routes/blogRoutes')
const adminRoutes = require('./Routes/adminRoutes')

const app = express()

const port = 3000


//connecting to mongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (error) => {
    if (error != null) {
        console.log("cant connect to mongo DB")
        app.render('404',{
            title: 'Cant Connect to the server '
        })
    }
})

//setting view engine
app.set('view engine', 'ejs')

//middleware for serving static files
app.use(express.static('public'))

app.use('/uploads',express.static('uploads'))       //applies this middleware only for routes which contains '/uploads' in their route and then the file name

app.use(express.urlencoded({
    extended: true
}))



//about path
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Write Liner | About Us'
    })
})


//middleware for Routes
app.use(blogRoutes)

// authenticating the admin middleware goes down here 

// admin routes middleware goes here 
app.use('/admin', adminRoutes)

//middleware for 404 error
app.use((request, response) => {
    response.status(404).render('404', {
        title: '404 Error'
    })
})

app.listen(port, () => console.log(`listening on port ${port}`))