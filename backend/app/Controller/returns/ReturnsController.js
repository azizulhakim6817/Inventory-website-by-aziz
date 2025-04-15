import ParentModel from "../../Module/Returns/ReturnModel.js";
import ChildsModel from "../../Module/Returns/ReturnProductsModel.js";
import CreateParentChildsService from "../../Service/user/common/CreateParentChildsService.js";
import ListOneJoinService from "../../Service/user/common/ListOneJoinService.js";
import DeleteParentChildService from "./../../Service/user/common/DeleteParentChildsService.js";
import ReturnReportService from './../../Service/reports/ReturnReportService.js';
import ReturnSummaryService from './../../Service/Summary/ReturnSummary.js';


export const CreateReturns = async (req, res) => {
  let result = await CreateParentChildsService(
    req,
    ParentModel,
    ChildsModel,
    "ReturnID"
  );
  res.status(200).json(result);
};

export const ReturnsList = async (req, res) => {
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

export const ReturnDelete = async (req, res) => {
  let result = await DeleteParentChildService(
    req,
    ParentModel,
    ChildsModel,
    "ReturnID"
  );
  res.status(200).json(result);
};


export const ReturnByDate = async (req, res) => {
  let result = await ReturnReportService(req);
  res.status(200).json(result);
};
export const ReturnSummary = async (req, res) => {
  let result = await ReturnSummaryService(req, ParentModel);
  res.status(200).json(result);
};
