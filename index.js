import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Gallery from "./modal/Gallery.js";
import multer from "multer";
import fs from 'fs';
import cors from 'cors';



const app = express();
const jsonParser = bodyParser.json();
const url =
  "mongodb+srv://dbUser:dbUserPassword@cluster0.5ok9m.mongodb.net/gallery?retryWrites=true&w=majority";
let Port = process.env.PORT || 4000;  
app.use(cors());
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"));

// app.use(multer( {desc: '/photo', 
//  rename: function (fieldname, filename)
//  {
//    return filename
//  }
// }).single('file'))

app.get("/photo", function (req, res) {
  Gallery.find().then((data) => {
    res.status(201).json(data);
  });
});

app.post("/photo", jsonParser, function (req, res) {
  const Newdata = new Gallery({photo: req.body.photo});
  console.log(req.files)

  Newdata
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => console.log(err));
});

Gallery.find({}, function (err, result) {
  console.log(result);
});

app.listen(Port, () => console.log("Server is running on port 4000"));
