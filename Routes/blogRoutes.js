const mongoose = require('mongoose')
const express = require('express')

//controllers 
const getBlogsForIndexPage = require('../Controllers/Blog/get-blogs-for-index')
const BlogPerCategory = require('./../Controllers/Blog/get-blogs')

const route = express.Router()

// list of all categories 
const categoriesList = [
    'Religion',
    'Fashion',
    'Business',
    'Sports',
    'Education',
    'Technology',
    'Others'
]

// home page 
route.get('/', (req, res) => {

    //getting result of all the cateogry blogs to HOME PAGE
    try {
        var results = []
        const promise = categoriesList.map(async (category) => {
            const blogs = await getBlogsForIndexPage(category)
            // pushing blogs into array
            results.push(blogs)
        })
        // when all the promises are done call the 'then' function 
        Promise.all(promise)
            .then(_ => {

                // sending the response back with the blogs for each category 
                res.render('index', {
                    title: 'Write Liner',
                    blogsPerCategory: results
                })
            })
            .catch(err => {
                // caught an error so sending 404 error 
                res.status(404).render('404', {
                    title: '404 Error'
                })
            })

    } catch (e) {
        res.status(404).render('404', {
            title: '404 Error'
        })
    }
})

//handling route for 'View All' displayed on home page 
route.get('/category/:category', async (req, res) => {

    const {
        category
    } = req.params

    try {
        // get all the blogs of a category
        const blogsList = await BlogPerCategory.getAllsBlogsPerCategory(category)

        res.render('category-view-all', {
            title: `Write Line | ${category}`,
            category: category,
            blogsList: blogsList
        })
    } catch (error) {
        console.log("caught error")
        res.status(404).render('404', {
            title: '404 Error'
        })
    }
})

//handling route for blog displayed on home page 
route.get('/category/:category_type/:blog_id', async (req, res) => {
    // getting values from the request object 
    const {
        category_type,
        blog_id
    } = req.params

    try {
        // getting the data from the controller for a certain blog-category
        const blog = await BlogPerCategory.getBlogPerCategory(category_type, blog_id)

        // sending the response back 
        res.render('blog-per-category', {
            title: `${blog.title}`,
            blog: blog
        })


    } catch (error) {
        console.log("caught error")
        res.status(404).render('404', {
            title: '404 Error'
        })
    }

})

//exporting routes
module.exports = route