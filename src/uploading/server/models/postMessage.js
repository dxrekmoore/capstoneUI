/* this file will utilzie the possiblities of Mongooes  */
import mongoose from 'mongoose';

//we can specify each posts have to have these things to be posted into mongoose
const postSchema = mongoose.Schema({
    audio_origin: String,
    location: String,
    message: String,
    creator: String,
    environment: [String], //array of strings
    phone_type: String,
    decibel: Number,
    selectedFile: String, //convert uploaded, pictures, etc, into string 
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;