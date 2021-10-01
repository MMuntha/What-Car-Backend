import User from '../Models/user.js'

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

const userSignup = async (req, res) => {

    const {user_username, user_email, user_password, user_phone_no} = req.body;

    try{
        const customer = await User.create({user_username, user_email, user_password, user_phone_no})
        res.status(200).json({customer: customer})
    }   
    catch(err) {

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