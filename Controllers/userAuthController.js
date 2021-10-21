import User from '../Models/user.js'
import sharp from 'sharp'


const handleErrors = (err) => {
    console.log(err)

    const errors = {user_email: '', user_username: '', user_phone_no: '', user_password: ''};

    if(err.message === 'This email is not registered'){

        errors.user_email = 'This email is not registered'
    }
    
    if(err.message === 'Incorrect password')
    {
        errors.user_password = 'Incorrect Password'
    }
    if(err.code === 11000){
        
        if(err.keyValue.user_username){

            errors.user_username = 'Username already taken'
        }
        if(err.keyValue.user_email){
            errors.user_email = 'Email already taken'
        }
    }

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            
            errors[properties.path] = properties.message;
        })
    }
    
    return errors
}

const upload_image = async(image) => {

    let fname = "";

    try{

        const name = Date.now() + '-' + Math.round(Math.random() * 1E9)
        fname = name + '-' + image.originalname

        const dest = './public/uploads/Profile-Pics/' + fname;
        await sharp(image.buffer).resize({width: 570, height: 570}).toFile(dest);

    }
    catch(err){

        console.log(err)
    }

    return fname;
}


const userSignup = async (req, res) => {

    let fname = ''

    if(req.file)
    {
        try{
             fname = await upload_image(req.file);

        }
        catch(err){

            console.log(err)
        }   
    }
    else
    {
        fname = 'user.png'
    }

    
    const {user_username, user_email, user_password, user_phone_no} = req.body;

    try{

        const customer = await User.create({user_username, user_email, user_password, user_phone_no, pro_image: fname})
        res.status(200).json({customer: customer})

    }
    catch(err){
         const errors = handleErrors(err)
            res.json({errors: errors})
    }


    
    
}   

const userLogin = async(req, res) => {

    const {email, password} = req.body;
    
    try{
        const user = await User.login(email, password);
        res.status(200).json({user: user})
    }
    catch(err){
        
       const errors = handleErrors(err)
       res.json({errors: errors})
    }

}

export default {
    userSignup,
    userLogin
}


// const {user_username, user_email, user_password, user_phone_no} = req.body;

//     try{
//         const customer = await User.create({user_username, user_email, user_password, user_phone_no})
//         res.status(200).json({customer: customer})
//     }   
//     catch(err) {

//         const errors = handleErrors(err)
//         res.json({errors: errors})
//     }