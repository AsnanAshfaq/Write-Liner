const multer = require("multer");

//alloowing only jpeg, jpg, png files to allow
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    //  accept a file
    cb(null, true);
  } else {
    //ignore the file because the incoming file is not an image type file
    cb();
  }
};

//configuring the storage structure of files
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //defines where the incoming files should be stored
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    //defines how the files should be named
    cb(null, file.originalname);
  },
});

// passign storage, limit, filefilter as a configutation 
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5, //limit for accepting files only upto 5mb
  },
  fileFilter: fileFilter,
});


const uploadFile = upload.single("image");


// validating the input fields from Form 
const validate_new_blog = (req, res) => {
  const {
    title,
    body,
    category
  } = req.body;
  const image = req.file;

  //title cannot be empty and  length cannot be less than 10 characters

  //body cannot be empty and length cannot be less than 300 characters

  //category must not be ''Choose...'

  //image cannot be empty 

  var error = ''

  if (title == "" || title.trim().length < 10) error = "Invalid Blog 'Title'"
  else if (body == "" || body.trim().length < 299) error = "Invalid Blog 'Body' "
  else if (category == "Choose...") error = "Please Choose a category"
  else if (image === undefined) error = "Please Select a Blog Image"

  if (error != '') {
    // found an error in the blog 
    console.log("Error")
    res.render('admin-add-blog', {
      title: 'Write Line | Admin | Invalid Blog ',
      blogTitle: title,
      blogBody: body,
      error: error,
      success: ''
    })
  } else {
    // no error found in the blog 
    console.log("No error", error)
    res.render('admin-add-blog', {
      title: 'Write Line | Admin | Add Blog',
      blogTitle: '',
      blogBody: '',
      error: '',
      success: `A new Blog has been added into '${category}' Category`
    })
  }
};

module.exports = {
  validate_new_blog,
  uploadFile,
}