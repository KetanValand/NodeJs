const { sequelize, DataTypes } = require("../../config/db");

const Blog = sequelize.define("blog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tags: {
        type: DataTypes.STRING(100)
    },
    image: {
        type: DataTypes.STRING(100)
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

module.exports = Blog;
