const Comment = require('../../models/comments');
class CommentController {
    createComment = async (req, res, next) => {
        try {
            let request = req.body;
            let blogId = req.params.id;

            let data = {
                blog_id: blogId,
                content: request.content,
                user_id: CLIENT_ID
            }
            let createdComment = await Comment.create(data);
            return res.status(200).json({ status: true, message: "Comment created successfully", data: createdComment });
        } catch (error) {
            next(error.message);
        }
    }
    deleteComment = async (req, res, next) => {
        try {
            let cid = req.params.cid;
            await Comment.destroy({ where: { id: cid , user_id: CLIENT_ID} });
            return res.status(200).json({ status: true, message: "Comment deleted successfully" });
        } catch (error) {
            next(error.message);
        }
    }
    getComment = async (req, res, next) => {
        try {
            let bid = req.params.id;
            let limit = (req.params.limit) ? req.params.limit : 100;
            let whereCondition = { user_id: CLIENT_ID };

            if (bid != null) {
                whereCondition.blog_id = bid;
            }
            let listOFComment = await Comment.findAll({ where: whereCondition, limit: limit });
            let totalRecords = listOFComment.length;
            return res.status(200).json({ status: true, 'message': "Comment details fetched successfully", totalRecords: totalRecords, "data": listOFComment });
        } catch (error) {
            next(error.message);
        }

    }
}

const objCommentController = new CommentController();
module.exports = objCommentController;