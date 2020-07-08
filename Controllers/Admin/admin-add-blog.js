const multer = require("multer");
const modelFunction = require('./../../Model/blogSchema')

//allowing only jpeg, jpg, png files to be selected
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
    //defines where the incoming files should be stored from the root node
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    //defines how the files should be named
    cb(null, file.originalname);
  },
});

// configuration 
const config = {
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 5, //limit for accepting files only upto 5mb
    },
    fileFilter: fileFilter,
  }

// passing config as configuration for multer
const upload = multer(config);


const uploadFile = upload.single("image");


// validating the input fields from Form 
const validate_new_blog = (req, res) => {

  // deconstruction req object  
  const {
    title,
    body,
    category
  } = req.body;
  const image = req.file;

  var error = ''
  //title cannot be empty and  length cannot be less than 10 characters
  if (title == "" || title.trim().length < 10) error = "Invalid Blog 'Title'"
  //body cannot be empty and length cannot be less than 300 characters
  else if (body == "" || body.trim().length < 299) error = "Invalid Blog 'Body' "
  //category must not be ''Choose...'
  else if (category == "Choose...") error = "Please Choose a category"
  //image cannot be empty 
  else if (image === undefined) error = "Please Select a Blog Image"

  if (error != '') {
    // found an error in the blog 

    res.render('admin-add-blog', {
      title: 'Write Line | Admin | Invalid Blog ',
      blogTitle: title,
      blogBody: body,
      error: error,
      success: ''
    })
  } else {
    // no error found in the blog 
    // making model for every Category in a generic way 

    const Model = modelFunction(category);
    const modelObject = new Model({
      title: title,
      body: body,
      category: category,
      image: image.path,
      likesCount: 0,
      commentCount: 0,
      likedBy: [],
      commentedBy: []
    })

    modelObject.save()
      .then(result => console.log("document saved"))
      .catch(err => console.log(err))

    // send the respone back to the user 

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