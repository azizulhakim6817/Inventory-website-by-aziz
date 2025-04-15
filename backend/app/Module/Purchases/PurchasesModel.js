import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    SupplierID: { type: mongoose.Schema.Types.ObjectId },
    VatTax: { type: Number },
    Discount: { type: Number },
    OtherCost: { type: Number },
    ShippingCost: { type: Number },
    GrandTotal: { type: Number },
    Note: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const PurchasesModel = mongoose.model("purchases", DataSchema);
export default PurchasesModel;
