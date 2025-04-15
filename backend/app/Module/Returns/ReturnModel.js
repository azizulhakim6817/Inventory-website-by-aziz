import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    UserEmail: { type: String },
    CustomerID: { type: mongoose.Schema.Types.ObjectId },
    VatTax: { type: Number },
    Discount: { type: Number },
    OtherCost: { type: Number },
    ShippingCost: { type: Number },
    GrandTotal: { type: Number },
    Note: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const ReturnsModel = mongoose.model("returns", DataSchema);
export default ReturnsModel;
