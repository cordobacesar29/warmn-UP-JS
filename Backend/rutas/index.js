const blogPost = require('./controllers/blogPost');

module.exports = (app) =>{ 
    app.use('/blogPost', blogPost);
};