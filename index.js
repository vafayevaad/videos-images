const express = require("express")
const path = require("path")
const multer = require("multer")
const fs = require("fs")

const app = express()

fs.mkdirSync('upload/images', { recursive: true })
fs.mkdirSync('upload/videos', { recursive: true })

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/images/')
  },
  filename: (req, file, cb) => {
  const ext = path.extname(file.originalname)
  const name = Date.now() + ext
  cb (null, name)
  }
})

const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/svg', 'image/webp']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  }else {
    cb(new Error('error type'))
  }
}

const imageUpload = multer ({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
})

app.post('/upload/image', imageUpload.array('image'), (req, res) => {
  res.json({
    message: "rasm yuklandi", file: req.files
  })
})



const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/videos/')
  },
  filename: (req, file, cb) => {
  const ext = path.extname(file.originalname)
  cb (null, Date.now() + ext)
  }
})

const videoFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/avi', 'video/mkv', 'video/webm']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  }else {
    cb(new Error('error type'))
  }
}

const videoUpload = multer ({
  storage: videoStorage,
  fileFilter: videoFilter,
  limits: { fileSize: 100 * 1024 * 1024 }
})

app.post('/upload/video', videoUpload.array('video'), (req, res) => {
  res.json({
    message: "video yuklandi", file: req.files
  })
})

app.listen(3000, () => {
  console.log("ishladi");
})