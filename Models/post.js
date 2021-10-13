import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({

    make: {
        type: String,
        required : [true, 'Please enter a Make'],
        lowercase: true

    },
    model : {
        type : String,
        required: [true, 'Please enter a Model'],
        lowercase: true
    },
    bodyType : {
        type : String, 
        lowercase : true
    },
    yom : {
        type : Number,
        maxlength: 4
    },
    milage: {
        type: Number,
    },
    transmission: {
        type : String
    },
    fuelType : {
        type : String,
    
    },
    price : {
        type : Number,
    },
    image : {
        type : String,
        required : [true, 'Please upload an image']
    },
    postedBy : {
        type : String,
        required : [true, 'Please enter a username'],
        lowercase : true
    },
    contact : {
        type : Number,
        required : [true, 'Please enter a contact number']
    },
    location: {
        type : String
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

export default Post