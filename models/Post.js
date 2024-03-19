import mongoose, {model, models, Schema} from "mongoose";

const PostSchema = new Schema({
    body: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    likedIds: {type: [mongoose.Types.ObjectId], ref: 'User'},
    image: {type: String},
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
},{timestamps: true});

export const Post = models?.Post || model('Post', PostSchema);