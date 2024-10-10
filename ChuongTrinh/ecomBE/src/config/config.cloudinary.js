const cloudinary = require('cloudinary').v2;

// return https url setting secure: true
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME ||'penguincdn',
    // secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// log the configuration
// console.log(cloudinary.config())
module.exports = cloudinary
