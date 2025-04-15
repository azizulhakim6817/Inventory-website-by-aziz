import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    CustomerName: { type: String },
    Phone: { type: String, unique: true },
    Email: { type: String },
    Address : { type: String },
  },
  { versionKey: false, timestamps: true }
);

const CustomerModel = mongoose.model("customers", CustomerSchema);
export default CustomerModel;