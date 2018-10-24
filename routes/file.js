var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.connection;
var multer = require('multer');
var fs = require('fs');
var { Readable } = require('stream');
// var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// var gfs = Grid(conn.db); 
// let bucket = new mongoose.GridFSBucket(db, {
//     bucketName: 'tracks'
//   });

// conn.once('open', function () {
  
//   // all set!
// })
router.post('/', (req, res) => {
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: "Upload Request Validation Failed" });
      } else if(!req.body.name) {
        return res.status(400).json({ message: "No track name in request body" });
      }
      
      let fileName = req.body.name;
      
      // Covert buffer to Readable Stream
      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);
  
      let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'files'
      });
  
      let uploadStream = bucket.openUploadStream(fileName);
      let id = uploadStream.fileName;
      readableTrackStream.pipe(uploadStream);
  
      uploadStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
  
      uploadStream.on('finish', () => {
        return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
      });
    });
  });
  
//   app.listen(3005, () => {
//     console.log("App listening on port 3005!");
//   });

router.get('/:filename', (req, res) => {
    var filename = req.params.filename;
    // try {
     
    // } catch(err) {
    //   return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
    // }
    res.set('content-type', 'application/pdf');
    res.set('accept-ranges', 'bytes');
  
    let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'files'
    });
  
    let downloadStream = bucket.openDownloadStreamByName(filename);
  
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });
  
    downloadStream.on('error', () => {
      res.sendStatus(404);
    });
  
    downloadStream.on('end', () => {
      res.end();
    });
  });

  module.exports = router;