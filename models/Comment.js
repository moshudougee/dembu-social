import mongoose, {model, models, Schema} from "mongoose";

const CommentSchema = new Schema({
    body: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    postId: {type: mongoose.Types.ObjectId, ref: 'Post'},
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Types.ObjectId, ref: 'Post'},
},{timestamps: true});

export const Comment = models?.Comment || model('Comment', CommentSchema);