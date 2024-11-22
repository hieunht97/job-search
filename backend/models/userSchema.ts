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
