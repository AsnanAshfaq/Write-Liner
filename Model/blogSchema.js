const mongoose = require('mongoose')

const schema = mongoose.Schema

//creating Schema
const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likesCount: Number,
    commentCount: Number,
    likedBy: [],
    commentedBy: []

}, {
    timestamps: true
})


//creating generic Model function 
const genericModel = (category) => {
    return mongoose.model(category, blogSchema)
}

module.exports = genericModel