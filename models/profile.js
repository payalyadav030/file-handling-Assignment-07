const imageController = {}


imageController.uploadFiles = function(request, response){
    console.log(request.files);
    console.log(request.body);

    return response.json({
        status : true,
        message : "file uploaded"
    })
}

module.exports = imageController;