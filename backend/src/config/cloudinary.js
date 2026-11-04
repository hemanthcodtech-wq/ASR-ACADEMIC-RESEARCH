const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config();

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('☁️ Cloudinary initialized successfully.');
} else {
  console.log('ℹ️ Cloudinary credentials not fully set in .env (falling back to mock/local upload URL generator)');
}

/**
 * Upload buffer to Cloudinary (supports PDF documents and images)
 * @param {Buffer} buffer - File buffer from multer memory storage
 * @param {Object} options - Options like folder, public_id, resource_type
 */
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      // Graceful fallback if credentials aren't entered yet
      const mockFileName = options.originalName || `document_${Date.now()}.pdf`;
      return resolve({
        secure_url: `https://res.cloudinary.com/demo/image/upload/v1/asar_portal/${mockFileName}`,
        public_id: `asar_portal/${Date.now()}_${mockFileName}`,
        bytes: buffer.length,
        format: options.format || 'pdf',
        resource_type: options.resource_type || 'raw',
        created_at: new Date().toISOString()
      });
    }

    const defaultOptions = {
      folder: 'asar_portal_documents',
      resource_type: 'auto', // handles images, PDFs, raw files seamlessly
      ...options
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      defaultOptions,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
  uploadToCloudinary
};

