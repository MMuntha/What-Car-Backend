import multer from "multer";

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true)
    }
    else
    {

        return cb(null, false, new Error('Invalid image type'));

    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload
