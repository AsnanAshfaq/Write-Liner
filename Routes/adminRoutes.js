const express = require("express");
const addBlogController = require("../Controllers/Admin/admin-add-blog");

const adminRoutes = express.Router();

//admin profile
adminRoutes.get("/", (req, res) => {
  res.render("admin", {
    title: "Write Liner | Admin",
  });
});


adminRoutes.post("/add-blog", addBlogController.uploadFile, addBlogController.validate_new_blog);

// adding an admin
adminRoutes.get("/add", (req, res) => {});


// adding a new blog by admin
adminRoutes.get("/add-blog", (req, res) => {
  res.render("admin-add-blog", {
    title: "Write Liner | Add new blog",
    blogTitle: '',
    blogBody: '',
    error: '',
    success: ''
  });
});


// updating a blog by admin 
adminRoutes.get("/update-blog", (req, res) => {
  res.send("Updating  a blog")
});


// delete a  blog by admin
adminRoutes.get("/delete-blog", (req, res) => {
  res.send("Delete page for a blog")
});

module.exports = adminRoutes;