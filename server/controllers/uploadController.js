const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// AWS Lightsail storage bucket access
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

//  multer to handle file uploads
const storage = multer.memoryStorage(); // image in memory temporarily
const upload = multer({ storage: storage });

const uploadProfilePicture = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = `${userType}/${userId}/${uuidv4()}${path.extname(file.originalname)}`;
    const uploadParams = {
        Bucket: 'bucket-ak1q67', 
        Key: `profile-pictures/${fileName}`, 
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        // upload the image to the bucket
        const data = await s3.send(new PutObjectCommand(uploadParams));

        // generate the image URL for future retrieval
        const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

        // save url and other profile details in database
        // db query here to save the url linked to the user

        res.status(200).json({ imageUrl, message: 'File uploaded successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error uploading file', details: err.message });
    }
};

module.exports = { upload, uploadProfilePicture };
