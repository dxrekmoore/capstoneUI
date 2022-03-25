/* this file will utilzie the possiblities of Mongooes  */
import mongoose from 'mongoose';

//we can specify each posts have to have these things to be posted into mongoose
const postSchema = mongoose.Schema({
    audio_origin: String,
    name: String,
    location: String,
    message: String,
    environment: [String], //array of strings
    phone_type: String,
    decibel: String,
    selectedFile: String, //convert uploaded, pictures, etc, into string 
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;