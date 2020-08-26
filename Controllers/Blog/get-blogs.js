const Model = require('./../../Model/blogSchema')

// get blog of a category from a card view on index page
const getBlogPerCategory = async (category, blog_id) => {

    // dynamic model object 
    const model = Model(category)
    // // find a blog which matches the blog_id
    const blog = await  model.findOne({
            _id: blog_id
        })
    return blog
}

// get all the blogs for a category for 'View All'
const getAllsBlogsPerCategory = async (category) => {

     // dynamic model object 
     const model = Model(category)
     const allBlogs = await model.find()
     return allBlogs
}

module.exports = {
    getBlogPerCategory,
    getAllsBlogsPerCategory
}