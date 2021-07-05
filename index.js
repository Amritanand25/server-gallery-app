import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Gallery from "./modal/Gallery.js";

const app = express();
const jsonParser = bodyParser.json();
const url =
  "mongodb+srv://dbUser:dbUserPassword@cluster0.5ok9m.mongodb.net/gallery?retryWrites=true&w=majority";
let Port = process.env.PORT || 4000;  

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"));

app.get("/photo", function (req, res) {
  Gallery.find().then((data) => {
    res.status(201).json(data);
  });
});

app.post("/photo", jsonParser, function (req, res) {
  const data = new Gallery({
    photo: req.body.photo,
  });
  data
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
