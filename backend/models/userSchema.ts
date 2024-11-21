import { timeStamp } from "console";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    company: {
      type: [String],
    },
    linkedin: {
      type: String,
      require: true,
    },
    github: {
      type: String,
    },
    doc: {
      type: String,
    },
  },
  { timeStamp: true }
);

export default mongoose.model("User", userSchema);
