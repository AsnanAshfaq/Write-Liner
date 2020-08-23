const express = require("express");
const addBlogController = require("../Controllers/Admin/admin-add-blog");

const adminRoutes = express.Router();

//admin profile
adminRoutes.get("/", (req, res) => {
  res.render("./admin/admin", {
    title: "Write Liner | Admin",
  });
});


adminRoutes.post("/add-blog", addBlogController.uploadFile, addBlogController.validate_new_blog);

// adding an admin
adminRoutes.get("/add", (req, res) => {});


// adding a new blog by admin
adminRoutes.get("/add-blog", (req, res) => {
  res.render("./admin/admin-add-blog", {
    title: "Write Liner | Add New Blog",
    blogTitle: '',
    blogBody: '',
    error: '',
    success: ''
  });
});


// updating a blog by admin 
adminRoutes.get("/update-blog", (req, res) => {
  res.render("./admin/admin-update-blog", {
    title: "Write Liner | Update Blog",
  });
  
});


// delete a  blog by admin
adminRoutes.get("/delete-blog", (req, res) => {
  res.render('./admin/admin-delete-blog',{
    title:'Write Liner | Delete Blog'
  })
});

// archive route 
adminRoutes.get('/archive',(req,res) => {
  res.render('./admin/admin-archive', {
    title: 'Write Liner | Archive'
  })
})
module.exports = adminRoutes;