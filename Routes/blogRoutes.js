const mongoose = require('mongoose')
const express = require('express')


const route = express.Router()



//get blogs for each category using its ID
route.get('/:category/:id', (req, res) => {
    
    res.send(`<p>Category Page..${req.params.category} ${req.params.id}</p>`)

})

//getting all  blogs
route.get('/', (req, res) => {

    //getting result of all the blogs to HOME PAGE

    res.render('index', {
        title: 'Write Liner',

    })

})

//exporting routes
module.exports = route