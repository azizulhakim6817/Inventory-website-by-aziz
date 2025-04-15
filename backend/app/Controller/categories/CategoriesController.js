import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import DataModel from "../../Module/CategoriesModel.js";
import ProductModel from "../../Module/Products/ProductsModel.js";
import CreateService from "../../Service/user/common/CreateService.js";
import UpdateService from "../../Service/user/common/UpdateService.js";
import DropDownService from "../../Service/user/common/DropDownService.js";
import ListService from "../../Service/user/common/ListService.js";
import CheckAssociateService from "../../Service/user/common/CheckAssociateService.js";
import DeleteService from "../../Service/user/common/DeleteService.js";
import DetailsByIDService from './../../Service/user/common/DetailsByIDService.js';

export const CreateCategoris = async (req, res) => {
  let result = await CreateService(req, DataModel);
  res.status(200).json(result);
};

export const UpdateCategoris = async (req, res) => {
  let result = await UpdateService(req, DataModel);
  res.status(200).json(result);
};

export const CategorisDropDown = async (req, res) => {
  let result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(result);
};
export const CategorisList = async (req, res) => {
  let SeachRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [{ Name: SeachRgx }];
  let result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(result);
};

// Categories => Delete => Associate check = true or false............
export const DeleteCategories = async (req, res) => {
  let DeleteID = req.params.id;
  let CheckAssociate = await CheckAssociateService({
    CategoriesID: new ObjectId(DeleteID),
    ProductModel,
  });

  if (CheckAssociate) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate with product" });
  } else {
    let result = await DeleteService(req, DataModel);
    res.status(200).json(result);
  }
};

//Categories Details By ID .........................
export const categoriesDetailsByID = async (req, res) => {
  let result = await DetailsByIDService(req, DataModel);
  res.status(200).json(result);
};
