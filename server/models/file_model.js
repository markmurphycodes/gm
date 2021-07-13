const mongoose = require("mongoose");
require("dotenv").config();

const fileSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  content: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);
module.exports = { File };
