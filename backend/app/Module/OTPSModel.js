import mongoose from "mongoose";

const OTPSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

const OTPModel = mongoose.model("otps", OTPSchema);
export default OTPModel;
