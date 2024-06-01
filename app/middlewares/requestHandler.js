const { check, validationResult } = require('express-validator');
const User = require('../models/users');
const Blog = require('../models/blogs');
const Comment = require('../models/comments');
const isBase64 = require('is-base64');
class requestHandler {
    localRequest = [];
    handleValidationErrors = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = {};
            errors.array().forEach(error => {
                formattedErrors[error.path] = error.msg;
            });
            return res.status(400).json({ status: false, errors: formattedErrors });
        }
        res.locals.localRequest = this.localRequest;
        next(); // move the next request
    }
    userRegisterRequest = () => {
        return [
            check('name').notEmpty().withMessage('Name field is required'),
            check('email').notEmpty().isEmail().withMessage('The required valid email').custom(async value => {
                let findUser = await User.findOne({ where: { email: value } });
                if (findUser) {
                    throw new Error("User already registered");
                }
                return true;
            }),
            check('password').notEmpty().withMessage('The password field is required'),
            this.handleValidationErrors
        ]
    }
    userLoginRequest = () => {
        return [
            check('email').notEmpty().isEmail().withMessage('The required valid email').custom(async value => {
                let findUser = await User.findOne({ where: { email: value } });
                if (!findUser) {
                    throw new Error('Unauthorized : User is not registered');
                }
                return true
            }),
            check('password').notEmpty().withMessage('The password field required'),
            this.handleValidationErrors
        ]

    }
    createBlogRequest = () => {
        return [
            check('title').notEmpty().withMessage('The title field required'),
            check('content').notEmpty().withMessage('The content field required'),
            check('tags').optional().notEmpty().withMessage('The tags field required'),
            check('image').optional().notEmpty().withMessage('The image field required').custom(async value => {
                // Check if the file is a valid Base64 string for images or PDF
                if (!isBase64(value, { allowMime: true })) {
                    throw new Error("Invalid base64 Format");
                }
                return true;

            }),
            this.handleValidationErrors
        ]

    }
    editBlogRequest = () => {
        return [
            check('id').notEmpty().withMessage('The blog id required').custom(async bid => {
                let findBlog = await Blog.findByPk(bid);
                if (!findBlog) {
                    throw new Error('blog does not Exists with ID = ' + bid);
                }
                return true
            }),
            check('title').notEmpty().withMessage('The title field required'),
            check('content').notEmpty().withMessage('The content field required'),
            check('tags').optional().notEmpty().withMessage('The tags field required'),
            check('image').optional().notEmpty().withMessage('The image field required').custom(async value => {
                // Check if the file is a valid Base64 string for images or PDF
                if (!isBase64(value, { allowMime: true })) {
                    throw new Error("Invalid base64 Format");
                }
                return true;

            }),
            this.handleValidationErrors
        ]

    }
    deleteBlogRequest = () => {
        return [
            check('id').notEmpty().withMessage('The blog id required').custom(async bid => {
                let findBlog = await Blog.findByPk(bid);
                if (!findBlog) {
                    throw new Error('blog does not Exists with ID = ' + bid);
                }
                this.localRequest['oldFilename'] = findBlog.image;
                return true
            }),
            this.handleValidationErrors
        ]
    }
    createCommentRequest = () => {
        return [
            check('id').notEmpty().withMessage('The blog id required').custom(async bid => {
                let findBlog = await Blog.findByPk(bid);
                if (!findBlog) {
                    throw new Error('blog does not Exists with ID = ' + bid);
                }
                return true
            }),
            check('content').notEmpty().withMessage('The content field required'),
            this.handleValidationErrors
        ]

    }
    deleteCommentRequest = () => {
        return [
            check('id').notEmpty().withMessage('The blog id required'),
            check('cid').notEmpty().withMessage('The comment id required').custom(async cid => {
                console.log(check('id').isString());
                let findComment = await Comment.findOne({ where: { id: cid, user_id: CLIENT_ID } });
                if (!findComment) {
                    throw new Error('Comment does not Exists with ID = ' + cid);
                }
                return true
            }),
            this.handleValidationErrors
        ]

    }
    getCommentRequest = () => {
        return [
            check('id').notEmpty().withMessage('The blog id required').custom(async bid => {
                let findBlog = await Blog.findByPk(bid);
                if (!findBlog) {
                    throw new Error('blog does not Exists with ID = ' + bid);
                }
                return true
            }),
            this.handleValidationErrors
        ]

    }

}

const objRequestHandler = new requestHandler();
module.exports = objRequestHandler;