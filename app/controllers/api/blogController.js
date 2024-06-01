const Blog = require('../../models/blogs');
class blogController {
    createBlog = async (req, res, next) => {
        try {
            let request = req.body;

            let data = {
                title: request.title,
                content: request.content,
                user_id: CLIENT_ID
            }
            if (request.image != null) {
                data.image = await FileUploadBase64(request.image);
            }
            if (request.tags != null) {
                data.tags = request.tags.toString();
            }
            let createdBlog = await Blog.create(data);
            return res.status(200).json({ status: true, message: "Blog created successfully", data: createdBlog });
        } catch (error) {
            next(error.message);
        }
    }
    editBlog = async (req, res, next) => {
        try {
            let bid = req.params.id;
            let request = req.body;
            let findBlog = await Blog.findByPk(bid);

            let updateBlog = {
                title: request.title,
                content: request.content,
                user_id: CLIENT_ID
            }
            if (request.image != null) {
                let oldFileDeletePath = IMAGE_PATH + findBlog.image;
                deleteFile(oldFileDeletePath);
                updateBlog.image = await FileUploadBase64(request.image);
            }
            if (request.tags != null) {
                updateBlog.tags = request.tags.toString();
            }
            updateBlog = await findBlog.update(updateBlog);
            return res.status(200).json({ status: true, message: "blog updated successfully", data: updateBlog });
        } catch (error) {
            next(error.message);

        }
    }
    deleteBlog = async (req, res, next) => {
        try {
            let bid = req.params.id;
            await Blog.destroy({ where: { id: bid } });
            let oldFileDeletePath = IMAGE_PATH + res.locals.localRequest.oldFilename;
            deleteFile(oldFileDeletePath);
            return res.status(200).json({ status: true, message: "Blog deleted successfully" });
        } catch (error) {
            next(error.message);
        }
    }
    getBlog = async (req, res, next) => {
        try {
            let bid = req.params.id;
            let limit = (req.params.limit) ? req.params.limit : 100;
            console.log(req.params);
            let whereCondition = { user_id: CLIENT_ID };

            if (bid != null) {
                whereCondition.id = bid;
            }
            let listOFBlog = await Blog.findAll({ where: whereCondition, limit: limit });
            let totalRecords = listOFBlog.length;
            return res.status(200).json({ status: true, 'message': "Blog details fetched successfully", totalRecords: totalRecords, "data": listOFBlog });
        } catch (error) {
            next(error.message);
        }

    }
}

const objBlogController = new blogController();
module.exports = objBlogController;