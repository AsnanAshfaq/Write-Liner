const mongoose = require('mongoose')
const express = require('express')
const Blog = require('../Model/blogSchema')

const route = express.Router()


//adding blog
route.get('/addblog', (req, res) => {

    const blog = new Blog({
        title: 'my blog',
        body: 'this is the body',
        author: 'M.Asnan Ashfaq',
        category: 'None',
        comments: [],
        likesCount: 0,
        likedBy: []
    })

    
    //saving data to the mongodb database
    blog.save()
        .then(result => {
            // mongoose.connection.close()
            res.send(result)

        })
        // })
        .catch(err => {
            // mongoose.connection.close()
            res.send(err)
        })
})


//get any blog by id
route.get('/blogs/:id', (req, res) => {
    
    const { params: { id } } = req

    //finding blog by id
    Blog.findById(id)
        .then(result => {

            //rendering searched blog result
            res.send(result)
        })

        //rendering 404 error
        .catch(err => {
            res.status(404).render('404', {
                title: 'Page Not Found'
            })
        })
})



//getting all  blogs
route.get('/blogs', (req, res) => {

    //getting result of all the blogs to HOME PAGE
    Blog.find((err, result) => {
        res.render('index', {
            title: 'Write Liner',
            Blogs: result
        })
    })

        .catch(err => {
            //rendering 404 error
            res.status(404).render('404', {
                title: 'Page Not Found'
            })
        })
})

//exporting routes
module.exports = route