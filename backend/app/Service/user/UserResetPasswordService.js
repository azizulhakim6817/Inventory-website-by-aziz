import OTPModel from "./../../Module/OTPSModel.js";

const UserResetPasswordService = async (Request, DataModel) => {
  try {
    let email = Request.body.email;
    let OTPcode = Request.body.OTP;
    let Newpassword = Request.body.password;
    let statusUpdate = 1;

    // OTP যাচাই করা হচ্ছে
    let DataCount = await OTPModel.aggregate([
      { $match: { email: email, otp: OTPcode, status: statusUpdate } },
      { $count: "total" },
    ]);

    if (DataCount.length > 0) {
      // OTP valid হলে পাসওয়ার্ড আপডেট করা হচ্ছে
      let PasswordUpdate = await DataModel.updateOne(
        { email: email },
        { password: Newpassword }
      );

      return { status: "success", data: PasswordUpdate };
    } else {
      // OTP ভুল হলে ফেইল রেসপন্স
      return { status: "fail", data: "Invalid Request!" };
    }
  } catch (err) {
    // কোনো ত্রুটি ঘটলে সেটাও রিটার্ন করছে
    return { status: "fail", data: err.toString() };
  }
};

export default UserResetPasswordService;
