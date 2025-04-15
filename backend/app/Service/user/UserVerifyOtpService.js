const UserVerifyOTPService = async (Request, OTPSModel) => {
  try {
    let email = Request.params.email;
    let OTPCode = Request.params.otp;
    let status = 0;
    let statusUpdate = 1;

    let DataCount = await OTPSModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: status } },
      { $count: "total" },
    ]);

    if (DataCount.length > 0) {
      let OTPUpdate = await OTPSModel.updateOne(
        { email: email, otp: OTPCode, status: status },
        { $set: { status: statusUpdate, otp: OTPCode } }
      );
      return { status: "success", data: OTPUpdate };
    } else {
      return { status: "fail", data: "Invalid OTP Code!" };
    }
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
export default UserVerifyOTPService;
