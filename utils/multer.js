import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, ".../files/temp")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const FilesUpload = multer({storage: storage})




