import ParentModel from "../../Module/Sales/SalesModel.js";
import ChildsModel from "../../Module/Sales/SaleProductsModel.js";
import CreateParentChildsService from "../../Service/user/common/CreateParentChildsService.js";
import ListOneJoinService from "../../Service/user/common/ListOneJoinService.js";
import DeleteParentChildService from './../../Service/user/common/DeleteParentChildsService.js';

export const CreateSales = async (req, res) => {
  let result = await CreateParentChildsService(
    req,
    ParentModel,
    ChildsModel,
    "SalesID"
  );
  res.status(200).json(result);
};

export const SalesList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };

  let JoinStage = {
    $lookup: {
      from: "customers",
      localField: "CustomerID",
      foreignField: "_id",
      as: "customers",
    },
  };

  let SearchArray = [
    { "customers.CustomerName": SearchRgx },
    { "customers.Phone": SearchRgx },
    { "customers.Email": SearchRgx },
    { "customers.Address": SearchRgx },
  ];

  let result = await ListOneJoinService(
    req,
    ParentModel,
    SearchArray,
    JoinStage
  );

  res.status(200).json(result);
};


export const SalesDelete = async (req, res) => {
  let result = await DeleteParentChildService(
    req,
    ParentModel,
    ChildsModel,
    "SalesID"
  );
  res.status(200).json(result);
};