import mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;
import DataModel from "../../Module/CustomersModel.js";
import SaleProductsModel from "../../Module/Sales/SaleProductsModel.js";
import CreateService from "../../Service/user/common/CreateService.js";
import UpdateService from "../../Service/user/common/UpdateService.js";
import DropDownService from "../../Service/user/common/DropDownService.js";
import ListService from "../../Service/user/common/ListService.js";
import CheckAssociateService from "../../Service/user/common/CheckAssociateService.js";
import DeleteService from "../../Service/user/common/DeleteService.js";
import DetailsByIDService from './../../Service/user/common/DetailsByIDService.js';

export const CreateCustomers = async (req, res) => {
  let result = await CreateService(req, DataModel);
  res.status(200).json(result);
};

export const UpdateCustomers = async (req, res) => {
  let result = await UpdateService(req, DataModel);
  res.status(200).json(result);
};

export const CustomersDropDown = async (req, res) => {
  let result = await DropDownService(req, DataModel, {
    _id: 1,
    CustomerName: 1,
  });
  res.status(200).json(result);
};
export const CustomersList = async (req, res) => {
  let SeachRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [
    { CustomerName: SeachRgx },
    { Email: SeachRgx },
    { Phone: SeachRgx },
    { Address: SeachRgx },
  ];
  let result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(result);
};

// Customers => Delete => Associate check = true or false............
export const DeleteCustomer = async (req, res) => {
  let DeleteID = req.params.id;

  let CheckAssociate = await CheckAssociateService({
    CategoriesID: new ObjectId(DeleteID),
    SaleProductsModel,
  });

  if (CheckAssociate) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate with Sales!" });
  } else {
    let result = await DeleteService(req, DataModel);
    res.status(200).json(result);
  }
};

//Customers Details By ID.........................
export const customersDetailsByID = async (req, res) => {
  let result = await DetailsByIDService(req, DataModel);
  res.status(200).json(result);
};

