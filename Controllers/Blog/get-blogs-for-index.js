const Model = require('./../../Model/blogSchema')

const getBlogsForIndexPage = async (category) => {
    
    // dynamic category model object
    const blogModel = Model(category)
    // awaiting for result for each category 
    const result = await blogModel.find((err,res) => {
        if(err) return err
        //no error...Hence Got the Results and send them back
    }).sort({_id:1}).limit(4)
    
    // got the results for each category and now sending them back as an array 
    return result 
}

module.exports = getBlogsForIndexPage