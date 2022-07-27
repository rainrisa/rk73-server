import mongoose from "mongoose";

const { model, Schema } = mongoose;

const vidSchema = new Schema({
  id: { type: Number, required: true, index: { unique: true, dropDups: true } },
  th: { type: Number, required: true, index: { unique: true, dropDups: true } },
  name: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  image: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  hash: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  click: { type: Number, required: true },
  link: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  since: { type: Number, required: true },
});

export const Vid = model("vids", vidSchema);
