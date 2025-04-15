import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const BrandModel = mongoose.model("brands", DataSchema);
export default BrandModel;
