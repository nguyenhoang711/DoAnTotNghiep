const { SuccessResponse } = require("../core/success.response");
const { BadRequestError } = require("../core/error.response");

const { uploadImageFromUrl, uploadImageFromLocal, uploadImageFromLocalFiles } = require("../services/upload.service");

class UploadController {
    uploadFile = async (req, res) => {
        new SuccessResponse({
            message: 'upload successfully uploaded',
            metadata: await uploadImageFromUrl()
        }).send(res);
    }
    uploadFileThumb = async (req, res) => {
        const {file} = req
        if(!file) throw new BadRequestError("Upload thumbnail file from local error")
        new SuccessResponse({
            message: 'Upload thumbnail success',
            metadata: await uploadImageFromLocal({
                path: file.path,
                objectId: req.body.objectId,
            })
        }).send(res);
    }
    uploadImageFromLocalFiles = async (req, res) => {
        const { files } = req
        if(!files.length) throw new BadRequestError("File missing")
        new SuccessResponse({
            message: 'Upload successfully uploaded',
            metadata: await uploadImageFromLocalFiles({
                files: files,
                productId: req.body.productId,
            })
        }).send(res);
    }
}

module.exports = new UploadController()