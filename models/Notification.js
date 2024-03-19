import mongoose, {model, models, Schema} from "mongoose";

const NotificationSchema = new Schema({
    body: {type: String},
    userId: {type:mongoose.Types.ObjectId, ref: 'User'},
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
},{timestamps: true});

export const Notification = models?.Notification || model('Notification', NotificationSchema);