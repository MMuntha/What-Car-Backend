import FormData from 'form-data'
import fetch from 'node-fetch'

const predict = async(req, res) => {

    const image =  req.file

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

export default{
    predict
}