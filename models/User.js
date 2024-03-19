import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {type: String},
    username: {type: String, unique: true},
    bio: {type: String},
    email: {type: String, unique: true},
    emailVerified: {type: Date},
    image: {type: String},
    coverImage: {type: String},
    profileImage: {type: String},
    hashedPassword: {type: String},
    followingIds: {type: [mongoose.Types.ObjectId], ref: 'User'},
    hasNotification: {type: Boolean},
    posts: {type: [mongoose.Types.ObjectId], ref: 'Post'},
    comments: {type: [mongoose.Types.ObjectId], ref: 'Comment'},
    notifications: {type: [mongoose.Types.ObjectId], ref: 'Notification'},
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);