import OTPModel from "../../Module/OTPSModel.js";
import SendEmailUtility from "./../../utility/SendEmailUtility.js";

const UserVerifyEmailService = async (Request, DataModel) => {
  try {
    let email = Request.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    let dataCount = await DataModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);

    if (dataCount.length > 0) {
      await OTPModel.create({ email: email, otp: OTPCode });
      let SendEmail = await SendEmailUtility(
        email,
        "Your PIN code is = " + OTPCode,
        "Inventory Wesite PIN code!"
      );
      return { status: "success", data: SendEmail };
    } else {
      return { status: "fail", data: "No user found" };
    }
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

export default UserVerifyEmailService;
