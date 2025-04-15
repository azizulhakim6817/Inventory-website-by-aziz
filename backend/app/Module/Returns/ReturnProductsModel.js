import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
   UserEmail: { type: String },
      ReturnID: { type: mongoose.Schema.Types.ObjectId },
      ProductID: { type: mongoose.Schema.Types.ObjectId },
      Qty: { type: Number },
      UnitCost: { type: Number },
      Total: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

const ReturnProductsModel = mongoose.model("returnproducts", DataSchema);
export default ReturnProductsModel;
