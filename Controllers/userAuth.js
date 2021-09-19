const User = require('../Models/user');

const userSignup = async (req, res) => {

    const {user_username, user_email, user_password, user_phone_no} = req.body;

    try{
        const customer = await User.create({user_username, user_email, user_password, user_phone_no})
        res.status(200).json({customer: customer})
    }   
    catch(err) {

        console.log(err);
    }
}   

module.exports = {
    userSignup
}