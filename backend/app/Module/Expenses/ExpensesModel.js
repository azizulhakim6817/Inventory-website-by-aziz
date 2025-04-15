import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    UserEmail: { type: String },
    TypeID: { type: mongoose.Schema.Types.ObjectId },
    Amount: { type: Number },
    Note: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const ExpensesModel = mongoose.model("expenses", DataSchema);
export default ExpensesModel;
