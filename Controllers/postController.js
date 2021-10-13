import FormData from 'form-data'
import fetch from 'node-fetch'
import Post from '../Models/post.js'
import sharp from 'sharp'

const upload_image = async(image) => {

    let fname = "";

    try{

        const name = Date.now() + '-' + Math.round(Math.random() * 1E9)
        fname = name + '-' + image.originalname

        const dest = './public/uploads/' + fname;
        await sharp(image.buffer).resize({width: 570, height: 570}).toFile(dest);

    }
    catch(err){

        console.log(err)
    }

    return fname;
}

const predict = async(req, res) => {

    try{
        const image =  await req.file

        const data = new FormData()
        data.append('image', image.buffer, {
            contentType: 'image/jpeg',
            filename: 'dummy.jpg',
        });
        const response = await fetch('http://localhost:4000/image', {
            method: 'POST',
            body: data
        })

        const predict = await response.json();
        console.log(predict)

        res.json(predict)

    }
    catch(e)
    {
        if(req.fileValidationError) {

            res.status(400).json({ errors: req.fileValidationError }); 

         }
         else
         {
            res.status(400).json({ errors: 'Failed due to some error' });
         }
         
    }

    

}

const addPost = async(req, res) => {

     try{

        const fname = await upload_image(req.file)

        const post = new Post({

            make : req.body.make,
            model : req.body.model,
            bodyType : req.body.bodyType,
            yom : req.body.yom,
            milage : req.body.milage,
            transmission : req.body.transmission,
            fueltype : req.body.fueltype,
            image: fname,
            price : req.body.price,
            postedBy : req.body.postedBy,
            contact : req.body.contact,
            location : req.body.location
        })

        try{
            await post.save();
            res.status(200).json({message: 'success'})
            console.log('success')
        }
        catch(err){
            console.log(err)
        }

    }
    catch(err){
        console.log(err)
    }


}

export default{
    predict,
    addPost
}


