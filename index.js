// Import necessary modules using ES Module syntax
import express from 'express';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the Express app
const app = express();
const port = 3000;

// Define the upload directory
const UPLOAD_DIRECTORY = path.join(__dirname, 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIRECTORY)) {
    fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true });
}

// --- Multer Configuration ---
// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where files will be saved
    cb(null, UPLOAD_DIRECTORY);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to avoid conflicts
    // Format: fieldname-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Create the Multer instance with the configured storage
const upload = multer({
    storage: storage,
    // Optional: Add file filter for security
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// --- Middleware ---
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(UPLOAD_DIRECTORY)));

// --- API Endpoints ---

/**
 * @route POST /upload
 * @description Uploads a single image file.
 * @access Public
 */
app.post('/upload', upload.single('image'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded. Please select an image.',
    });
  }

  // Construct the public URL for the uploaded file
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  // Respond with success message and file information
  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully!',
    file: {
      filename: req.file.filename,
      url: fileUrl,
      mimetype: req.file.mimetype,
      size: req.file.size,
    },
  });
});

/**
 * @route GET /images
 * @description Retrieves a list of all uploaded images.
 * @access Public
 */
app.get('/images', (req, res) => {
    fs.readdir(UPLOAD_DIRECTORY, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            return res.status(500).json({ success: false, message: 'Unable to retrieve images.' });
        }

        const imageList = files
            .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)) // Filter for common image extensions
            .map(file => ({
                filename: file,
                url: `${req.protocol}://${req.get('host')}/uploads/${file}`
            }));

        res.json({ success: true, images: imageList });
    });
});


// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'An unexpected error occurred.'
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('File Upload Service by Suryanarayan Panda');
});
