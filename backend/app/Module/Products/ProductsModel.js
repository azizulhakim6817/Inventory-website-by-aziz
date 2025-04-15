import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    CategoriesID: { type: mongoose.Schema.Types.ObjectId },
    BrandID: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String },
    Unit: { type: String },
    Details: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const ProductModel = mongoose.model("products", DataSchema);
export default ProductModel;
