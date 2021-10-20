import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    user_username : {
        type : String,
        required : [true, 'Please enter a username'],
        unique: true,
        lowercase: true
    },  
    user_email : {
        type : String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    user_password : {
        type: String,
        required : true,
        minlength: [6, 'Minimum password length is 6']
    },
    user_phone_no : {
        type : Number,
        required : true,
        minlength: 10,
        maxlength: 12
    },
    no_of_posts : {
        type: Number,
        default: 0
    },
    comments : [{
        
        commentedBy: String,
        commentedById: String,
        comment: String
    }]

}, {timestamps: true})

userSchema.pre('save', async function (next) {

    const salt = await bcrypt.genSalt();
    this.user_password = await bcrypt.hash(this.user_password, salt);
    next()
})

userSchema.statics.login = async function(email, password){

    const user = await this.findOne({user_email:email});

    if(user)
    {
        const auth = await bcrypt.compare(password, user.user_password);

        if(auth)
        {
            return user
        }

        throw Error('Incorrect password')
    }

    throw Error('This email is not registered')
}


const User = mongoose.model('User', userSchema);

export default User