import mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;
import DataModel from "../../Module/Products/ProductsModel.js";
import SalesModel from "./../../Module/Sales/SalesModel.js";
import PurchasesModel from "../../Module/Purchases/PurchasesModel.js";
import CheckAssociateService from "../../Service/user/common/CheckAssociateService.js";
import CreateService from "../../Service/user/common/CreateService.js";
import UpdateService from "../../Service/user/common/UpdateService.js";
import ListTwoJoinService from "./../../Service/user/common/ListTwoJoinService.js";
import DeleteService from "../../Service/user/common/DeleteService.js";
import DetailsByIDService from "./../../Service/user/common/DetailsByIDService.js";

export const CreateProducts = async (req, res) => {
  let retult = await CreateService(req, DataModel);
  res.status(200).json(retult);
};
export const UpdateProducts = async (req, res) => {
  let retult = await UpdateService(req, DataModel);
  res.status(200).json(retult);
};

export const ProductList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };

  let JoinStage1 = {
    $lookup: {
      from: "brands",
      localField: "BrandID",
      foreignField: "_id",
      as: "brands",
    },
  };

  let JoinStage2 = {
    $lookup: {
      from: "categories",
      localField: "CategoriesID",
      foreignField: "_id",
      as: "categories",
    },
  };

  let SearchArray = [
    { Name: SearchRgx },
    { Unit: SearchRgx },
    { Details: SearchRgx },
    { "brands.Name": SearchRgx },
    { "categories.Name": SearchRgx },
  ];

  let result = await ListTwoJoinService(
    req,
    DataModel,
    SearchArray,
    JoinStage1,
    JoinStage2
  );

  res.status(200).json(result);
};

//Products => Delete => Associate check = true or false............
export const DeleteProduct = async (req, res) => {
  let DeleteID = req.params.id;

  let CheckReturnAssociate = await CheckAssociateService({
    ProductID: new ObjectId(DeleteID).ReturnProductsModel,
  });

  let CheckPurchaseAssociate = await CheckAssociateService({
    ProductID: new ObjectId(DeleteID),
    PurchasesModel,
  });

  let CheckSalesAssociate = await CheckAssociateService({
    ProductID: new ObjectId(DeleteID),
    SalesModel,
  });

  if (CheckReturnAssociate) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate with return!" });
  } else if (CheckPurchaseAssociate) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate with purchases!" });
  } else if (CheckSalesAssociate) {
    res.status(200).json({ status: "associate", data: "Associate with Sales" });
  } else {
    let result = await DeleteService(req, DataModel);
    res.status(200).json(result);
  }
};

// Product Details By ID Brands.........................
export const productDetailsByID = async (req, res) => {
  let result = await DetailsByIDService(req, DataModel);
  res.status(200).json(result);
};
