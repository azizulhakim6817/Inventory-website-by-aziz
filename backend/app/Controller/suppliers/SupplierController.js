import mongoose from "mongoose";
import DataModel from "../../Module/SuppliersModel.js";
import PurchasesModel from "../../Module/Purchases/PurchasesModel.js";
import CreateService from "../../Service/user/common/CreateService.js";
import UpdateService from "../../Service/user/common/UpdateService.js";
import DropDownService from "../../Service/user/common/DropDownService.js";
import ListService from "../../Service/user/common/ListService.js";
import CheckAssociateService from "./../../Service/user/common/CheckAssociateService.js";
import DetailsByIDService from './../../Service/user/common/DetailsByIDService.js';

export const CreateSupplier = async (req, res) => {
  let result = await CreateService(req, DataModel);
  res.status(200).json(result);
};

export const UpdateSupplier = async (req, res) => {
  let result = await UpdateService(req, DataModel);
  res.status(200).json(result);
};

export const SupplierDropDown = async (req, res) => {
  let result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(result);
};
export const SupplierList = async (req, res) => {
  let SeachRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [{ Name: SeachRgx }];
  let result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(result);
};

export const DeleteSupplier = async (req, res) => {
  let DeletID = req.params.id;
  let ObjectId = mongoose.Types.ObjectId;

  let CheckAssociate = await CheckAssociateService({
    SupplierID: new ObjectId(DeletID),
    PurchasesModel,
  });
  if (CheckAssociate) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate with Purchases!" });
  } else {
    let result = await CheckAssociateService(req, DataModel);
    res.status(200).json(result);
  }
};


// Supplier By ID Brands.........................
export const supplierDetailsByID = async (req, res) => {
  let result = await DetailsByIDService(req, DataModel);
  res.status(200).json(result);
};
