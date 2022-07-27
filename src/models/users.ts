import mongoose from "mongoose";

const { model, Schema } = mongoose;

const userSchema = new Schema({
  id: { type: Number, required: true, index: { unique: true, dropDups: true } },
  th: {
    type: Number,
    required: true,
    index: { unique: true, dropDups: true },
  },
  click: { type: Number, required: true },
  point: { type: Number, required: true },
  since: { type: Number, required: true },
});

export const User = model("users", userSchema);
