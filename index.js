const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 7676;
const multer = require('multer');

app.use(express.json());
app.use( '/public',  express.static('public'));

var imageController = require('./models/profile.js')

const fileStorage = multer.diskStorage({
    destination : function(req, file, cb){
        console.log(req.url);
        var url = req.url;
        var mimeType = file.mimetype;
        if(url == '/upload-files'){
            var allowedType =[
                'image/jpeg',
                'image/jpg',
                'image/png',
                'application/pdf'
            ];
            if(allowedType.indexOf(mimeType) == -1){
                return cb("invalied file!!!!")
            }
        }
        var uploadPath = 'public/uploads/';
        return cb(null, uploadPath);
    },
    filename : function(req, file, cb){
        console.log(file);
        var filename = (new Date().getTime()) + file.originalname
        return cb(null, filename )
    }
});

const upload = multer({
   // dest : 'uploads/'
   storage: fileStorage
})

var fields = [
    {name : "images", maxCount : 5},
    {name : "pdfFiles", maxCount: 2}
]
app.post('/upload-files',upload.fields(fields), imageController.uploadFiles)

app.listen(PORT, function(){
    console.log("application has been started on port", PORT);
})