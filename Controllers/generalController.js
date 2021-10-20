import User from "../Models/user.js";

const userDetails = async(req, res) => {
    const id = req.body.id

    try{

        const result = await User.findById(id)
        res.status(200).json({user: result})
        
    }
    catch(err){
        console.log(err)
    }
}

const addComment = async( req, res) => {
    
    const commentedOnId = req.body.commentedOnId
    const commentedBy = req.body.commentedBy
    const commentedById = req.body.commentedById
    const comment = req.body.comment

    try{
        const result = await User.findByIdAndUpdate(commentedOnId,{$push: {comments: {commentedById: commentedById, commentedBy: commentedBy, comment: comment}}})
        res.status(200).json({result: result})
    }
    catch(err) {
        console.log(err)
    }
}

export default{

    userDetails,
    addComment
}