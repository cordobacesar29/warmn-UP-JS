const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        contenido: {
            type: String,
            required: true,
        },
        imagen: {
            type: String,
            required: true,
        },
        categoria: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("profile", PostSchema);