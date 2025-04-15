import DataModel from "../../Module/UserModel.js";
import OTPSModel from "../../Module/OTPSModel.js";
import UserCreateRegiService from "../../Service/user/UserCreateRegiService.js";
import UserLoginService from "../../Service/user/UserLoginService.js";
import UserVerifyOTPService from "../../Service/user/UserVerifyOtpService.js";
import UserVerifyEmailService from "../../Service/user/UserVerifyEmailService.js";
import UserDetailsService from "../../Service/user/UserDetailsService.js";
import UserUpdateService from './../../Service/user/UserUpdateService.js';
import UserResetPasswordService from './../../Service/user/UserResetPasswordService.js';

export const Registration = async (req, res) => {
  let result = await UserCreateRegiService(req, DataModel);
  res.status(200).json(result);
};

export const Login = async (req, res) => {
  let result = await UserLoginService(req, DataModel);
  res.status(200).json(result);
};
export const ProfileDetails = async (req, res) => {
  let result = await UserDetailsService(req, DataModel);
  res.status(200).json(result);
};

export const ProfileUpdate = async (req, res) => {
  let result = await UserUpdateService(req, DataModel);
  res.status(200).json(result);
};

export const RecoverVerifyEmail = async (req, res) => {
  let result = await UserVerifyEmailService(req, DataModel);
  res.status(200).json(result);
};
export const RecoverVerifyOTP = async (req, res) => {
  let result = await UserVerifyOTPService(req, OTPSModel);
  res.status(200).json(result);
};
export const RecoverVerifResetPssword = async (req, res) => {
  let result = await UserResetPasswordService(req, DataModel);
  res.status(200).json(result);
};
