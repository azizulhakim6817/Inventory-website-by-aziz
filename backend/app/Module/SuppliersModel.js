import mongoose from "mongoose";

const SuppliersSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String },
    Phone: { type: String, unique: true },
    Email: { type: String },
    Address : { type: String },
  },
  { versionKey: false, timestamps: true }
);

const SuppliersModel = mongoose.model("suppliers", SuppliersSchema);
export default SuppliersModel;