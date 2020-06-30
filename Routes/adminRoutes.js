
const express = require('express')
const addBlogController = require('../Controllers/Admin/admin-add-blog')


const adminRoutes = express.Router()


//admin profile 
adminRoutes.get('/',(req,res) => {
    res.render('admin',{
        title: 'Write Liner | Admin'
    })
})

adminRoutes.post('/', addBlogController)

// adding an admin 
adminRoutes.get('/add',(req,res) => {

})


// adding a new blog by admin
adminRoutes.get('/add-blog',(req,res) => {
    res.render('admin-add-blog',{
        title: 'Write Liner | Add new blog'
    })
})



module.exports = adminRoutes