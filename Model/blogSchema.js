const mongoose = require('mongoose')

const schema = mongoose.Schema

//creating Schema
const blogSchema = new schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    comments:[],
    likesCount: Number,
    likedBy:[],

},{ timestamps: true})


//creating Model
const Blog = mongoose.model('Blogs',blogSchema)

module.exports = Blog 