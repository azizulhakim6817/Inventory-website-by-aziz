import mongoose from "mongoose";

const Datachema = mongoose.Schema(
  {
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String },
    photo: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = mongoose.model("users", Datachema);
export default UserModel;
