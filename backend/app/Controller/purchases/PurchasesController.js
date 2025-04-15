import ParentModel from "../../Module/Purchases/PurchasesModel.js";
import ChildsModel from "../../Module/Purchases/PurchasesProductsModel.js";
import CreateParentChildsService from "../../Service/user/common/CreateParentChildsService.js";
import ListOneJoinService from "../../Service/user/common/ListOneJoinService.js";
import DeleteParentChildService from "./../../Service/user/common/DeleteParentChildsService.js";
import PurchasesReportService from "./../../Service/reports/PurchasesReportService.js";
import PurchaseSummaryService from "./../../Service/Summary/PurchaseSummary.js";

export const CreatePurchases = async (req, res) => {
  let result = await CreateParentChildsService(
    req,
    ParentModel,
    ChildsModel,
    "PurchasesID"
  );
  res.status(200).json(result);
};

export const PurchasesList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let JoinStage = {
    $lookup: {
      from: "suppliers",
      localField: "SupplierID",
      foreignField: "_id",
      as: "suppliers",
    },
  };
  let SearchArray = [
    { Note: SearchRgx },
    { "suppliers.Name": SearchRgx },
    { "suppliers.Email": SearchRgx },
    { "suppliers.Phone": SearchRgx },
    { "suppliers.Address": SearchRgx },
  ];

  let result = await ListOneJoinService(
    req,
    ParentModel,
    SearchArray,
    JoinStage
  );
  res.status(200).json(result);
};
export const PurchasesDelete = async (req, res) => {
  let result = await DeleteParentChildService(
    req,
    ParentModel,
    ChildsModel,
    "PurchasesID"
  );
  res.status(200).json(result);
};

export const PurchaseByDate = async (req, res) => {
  let result = await PurchasesReportService(req);
  res.status(200).json(result);
};

export const PurchaseSummary = async (req, res) => {
  let result = await PurchaseSummaryService(req, ParentModel);
  res.status(200).json(result);
};
