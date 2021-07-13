const express = require("express");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
let router = express.Router();
require("dotenv").config();

const FileModel = require("../../models/file_model");

const storage = new GridFsStorage({
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["text/plain"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-vos-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "uploads",
      filename: `${Date.now()}-vos-${file.originalname}`,
    };
  },
});
const upload = multer({ storage: storage });

router.route("/upload").post(upload.single("file"), async (req, res) => {
  try {
    const f = {
      filename: req.body.filename,
      content: {
        data: req.body.data,
        contentType: req.body.contentType,
      },
    };
    FileModel.create(f, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Written to database: ", item);
        res.status(200).json({ msg: "uploaded!" });
      }
    });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.route("/getfiles").get(async (req, res) => {
  try {
    FileModel.find().toArray((err, item) => {
      const files = item.map((element) => element._id);
    });
    res.status(200).send(files);
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    var id = req.params.id;
    const result = await FileModel.fineOneById(id);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).json({ e });
  }
});

module.exports = router;
