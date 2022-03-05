const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        buyer_id: {
            type: Schema.Types.ObjectId,
            default: null,
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        },
        picture: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);


module.exports = model("Book",  BookSchema);
