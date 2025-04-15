import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, unique: true },
  },
  { versionKey: false, timestamps: true }
);

const ExpenseTypesModel = mongoose.model("expensetypes", DataSchema);
export default ExpenseTypesModel;
