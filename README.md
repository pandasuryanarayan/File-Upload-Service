# Assignment 3: File Upload Service  
**Author: Suryanarayan Panda**

## Objective  
This project is a basic image upload service built with **Node.js** and **Express**. It uses the `multer` middleware to handle file uploads and stores the images in a local `uploads/` directory. The uploaded images are made publicly accessible through a static file server.

---

## Features  
- **Upload API**: A `POST` endpoint to upload a single image.
- **Public Access**: Uploaded images are served statically and can be accessed via a direct URL. 
- **File Validation**: Only accepts image files (`image/jpeg`, `image/png`, etc.). 
- **List API**: A `GET` endpoint to retrieve a list of all available images.

---
## Project Structure

```

file-upload-service/
├── index.js               # Main server file
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Exact versions of installed dependencies
└── README.md              # Project documentation

```

## Setup and Installation  

### Prerequisites  
Ensure the following software is installed:

- **Node.js**: Version 22.x or later (LTS recommended)
  Download: [https://nodejs.org/](https://nodejs.org/) 
- **npm**: Comes bundled with Node.js 

Verify installation:
```bash
node -v
npm -v
```

### Steps

#### 1. Obtain the Project Files

**Option A: Clone the Repository**

```bash
git clone [YOUR_REPOSITORY_URL_HERE]
```

**Option B: Download Manually**
Download `index.js` and `package.json` into a folder (e.g., `my-file-upload-service`).

#### 2. Navigate to the Project Directory

```bash
cd /path/to/your/project-folder
```

#### 3. Install Dependencies

```bash
npm install
```

---

## Running the Server

Start the server with:

```bash
npm start
```
or

```bash
npm dev
```

You should see:

```
Server is running on http://localhost:3000  
File Upload Service by Suryanarayan Panda
```

---

## API Usage

All responses are in JSON format. Base URL: `http://localhost:3000`

### 1. Upload an Image

* **Endpoint**: `POST /upload`
* **Form-Data key**: `image`

**Example using curl:**

```bash
curl -X POST -F "image=@/path/to/your/image.jpg" http://localhost:3000/upload
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Image uploaded successfully!",
  "file": {
    "filename": "image-1673891284729-98472934.jpg",
    "url": "http://localhost:3000/uploads/image-1673891284729-98472934.jpg",
    "mimetype": "image/jpeg",
    "size": 102400
  }
}
```

---

### 2. Retrieve a List of Images

* **Endpoint**: `GET /images`

**Example using curl:**

```bash
curl -X GET http://localhost:3000/images
```

**Response (200 OK):**

```json
{
  "success": true,
  "images": [
    {
      "filename": "image-1673891284729-98472934.jpg",
      "url": "http://localhost:3000/uploads/image-1673891284729-98472934.jpg"
    },
    {
      "filename": "image-1673891399123-12948129.png",
      "url": "http://localhost:3000/uploads/image-1673891399123-12948129.png"
    }
  ]
}
```

---

### 3. Access an Uploaded Image Directly

Use this format:

```
http://localhost:3000/uploads/<filename>
```

**Example:**
[http://localhost:3000/uploads/image-1673891284729-98472934.jpg](http://localhost:3000/uploads/image-1673891284729-98472934.jpg)

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch:

   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit changes:

   ```bash
   git commit -m 'Add Your Feature'
   ```
4. Push to GitHub:

   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a Pull Request

---

## License

This project is licensed under the [Apache License 2.0](LICENSE). See the LICENSE file in this repository for full details.

---

## Support

If you encounter any issues, open an issue on the GitHub repo or contact **Suryanarayan Panda** directly.

---

## Acknowledgments

* **Express.js**: Framework used for building the web server.
* **Multer**: Middleware used for handling multipart/form-data (file uploads).
