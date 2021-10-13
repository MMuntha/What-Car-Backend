import FormData from 'form-data'
import fetch from 'node-fetch'

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

export default{
    predict
}