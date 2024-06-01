const routerWithoutAuth = require('express').Router();
const routerWithAuth = require('express').Router();
const objAuthController = require('../controllers/api/authController');
const objBlogController = require('../controllers/api/blogController');
const objCommentController = require('../controllers/api/commentController');
const objRequestHandler = require('../middlewares/requestHandler');
const jwtTokenVerify = require('../middlewares/jwtTokenVerify');

routerWithoutAuth.get('/check', (req, res) => {
    res.send("ketan valand");
});

routerWithoutAuth.post('/auth/register', objRequestHandler.userRegisterRequest(), objAuthController.register);
routerWithoutAuth.post('/auth/login', objRequestHandler.userLoginRequest(), objAuthController.login);

routerWithAuth.post('/blogs', objRequestHandler.createBlogRequest(), objBlogController.createBlog);
routerWithAuth.put('/blogs/:id', objRequestHandler.editBlogRequest(), objBlogController.editBlog);
routerWithAuth.delete('/blogs/:id', objRequestHandler.deleteBlogRequest(), objBlogController.deleteBlog);
routerWithAuth.get('/blogs/:id?', objBlogController.getBlog);

routerWithAuth.post('/blogs/:id/comments', objRequestHandler.createCommentRequest(), objCommentController.createComment);
routerWithAuth.get('/blogs/:id/comments', objRequestHandler.getCommentRequest(), objCommentController.getComment);
routerWithAuth.delete('/blogs/:id/comments/:cid', objRequestHandler.deleteCommentRequest(), objCommentController.deleteComment);

module.exports = (app) => {
    app.use('/api', routerWithoutAuth);
    app.use('/api', jwtTokenVerify, routerWithAuth);
}