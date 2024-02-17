import mongoose, { Schema } from "mongoose";

interface I_URL_SCHEMA {
  originalUrl: String;
  shortendUrl: String;
  visiteHistory: String[];
  createdAt: Date;
}

const URL_SCHEMA = new Schema<I_URL_SCHEMA>({
  originalUrl: { type: String, required: true },
  shortendUrl: { type: String, required: true },
  visiteHistory: [String],
  createdAt: Date,
});

const URL = mongoose.model("URL", URL_SCHEMA);
export default URL;
