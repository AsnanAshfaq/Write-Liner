const validate_new_blog = (req, res) => {

  const { title, body, category, image } = req.body

  var is_blog_valid = true

  //title cannot be empty and  length cannot be less than 10 characters
  if (title.length == 0 || title.length < 10) is_blog_valid = false

  //body cannot be empty and length cannot be less than 300 characters
  if (body.length == 0 || body.length < 299) is_blog_valid = false

  //category must not be ''Choose...'
  if (category == 'Choose...') is_blog_valid = false

  //image cannot be empty and cannot be more than 5 
  if (image == '') is_blog_valid = false

  if (image instanceof Array & image.length > 5) is_blog_valid = false
  // console.log(typeof(image))
  // console.log({image})

  if (is_blog_valid)  res.send("im admin")
  else   res.send("sending invalid blog")
}


module.exports = validate_new_blog