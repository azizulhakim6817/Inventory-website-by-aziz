import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    PurchasesID: { type: mongoose.Schema.Types.ObjectId },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

const PurchasesProductsModel = mongoose.model("purchasesproducts", DataSchema);
export default PurchasesProductsModel;
