
const express = require('express')

const adminRoutes = express.Router()


//admin profile 
adminRoutes.get('/',(req,res) => {
    res.render('admin',{
        title: 'Write Liner | Admin'
    })
})

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