import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, unique: true },
  },
  { versionKey: false, timestamps: true }
);

const CategoriesModel = mongoose.model("categories", CategoriesSchema);
export default CategoriesModel;
