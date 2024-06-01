const { sequelize, DataTypes } = require("../../config/db");

const Comment = sequelize.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
},
    {
        timestamps: false
    }
);

module.exports = Comment;
