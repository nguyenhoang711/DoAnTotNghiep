const cloudinary = require('../config/config.cloudinary')
const crypto = require('crypto')
let uploadImageFromUrl = async () => {
    try {
        const urlImage = 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgurcl7xiwab80'
        const folderName = '/products/8409', newFileName = 'demo'

        const result = await cloudinary.uploader.upload(urlImage, {
            public_id: newFileName,
            folder: folderName
        })

        console.log(result)
        return result
    } catch (e) {
        console.error(e)
    }
}

let uploadImageFromLocal = async ({
    path,
    objectId,
    folderName = 'temp/'
}) => {
    const randomImageName = crypto.randomBytes(16).toString('hex');
    const folder = folderName + objectId;
    try {    
        const result = await cloudinary.uploader.upload(path, {
            public_id: randomImageName,
            folder: folder
        })
        return {
            image_url: result.secure_url,
            // thumb_url: await cloudinary.url(result.public_id, {
            //     height: 100,
            //     width: 100,
            //     format: 'jpg'
            // })
        }
    } catch (e) {
        console.error(e)
    }
}

let uploadImageFromLocalFiles = async ({
    files,
    productId,
    folderName = 'temp/'
}) => {
    try {    
        if(!files.length) return;
        const uploadedUrls = [];
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName + productId
            })

            uploadedUrls.push({
                image_url: result.secure_url,
                thumb_url: await cloudinary.url(result.public_id, {
                    height: 255,
                    width: 254,
                    format: 'jpg'
                })
            })
        }
        return uploadedUrls
    } catch (e) {
        console.error('Error uploading images: ', e)
    }
}
module.exports = {
    uploadImageFromLocal,
    uploadImageFromUrl,
    uploadImageFromLocalFiles
}