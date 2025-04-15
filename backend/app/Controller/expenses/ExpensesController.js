import DataModel from "../../Module/Expenses/ExpensesModel.js";
import CreateService from "../../Service/user/common/CreateService.js";
import DeleteService from "../../Service/user/common/DeleteService.js";
import ListOneJoinService from "../../Service/user/common/ListOneJoinService.js";
import UpdateService from "./../../Service/user/common/UpdateService.js";
import ExpenseReportService from "./../../Service/reports/ExpensesReportService.js";
import SalesSummaryService from './../../Service/Summary/ExpenseSummary.js';
import DetailsByIDService from './../../Service/user/common/DetailsByIDService.js';

export const CreateExpeness = async (req, res) => {
  let result = await CreateService(req, DataModel);
  res.status(200).json(result);
};

export const UpdateExpenses = async (req, res) => {
  let result = await UpdateService(req, DataModel);
  res.status(200).json(result);
};

export const ExpensesList = async (req, res) => {
  let SeachRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [
    { Note: SeachRgx },
    { Amount: SeachRgx },
    { "Type.Name": SeachRgx },
  ];
  let JoinStage = {
    $lookup: {
      from: "expensetypes",
      localField: "TypeID",
      foreignField: "_id",
      as: "Type",
    },
  };
  let retult = await ListOneJoinService(req, DataModel, SearchArray, JoinStage);
  res.status(200).json(retult);
};

export const DeleteExpense = async (req, res) => {
  let result = await DeleteService(req, DataModel);
  res.status(200).json(result);
};

export const ExpensesByDate = async (req, res) => {
  let result = await ExpenseReportService(req, DataModel);
  res.status(200).json(result);
};

export const ExpenseSummary = async (req, res) => {
  let result = await SalesSummaryService(req, DataModel);
  res.status(200).json(result);
};

//Expense Details By ID Brands.........................
export const expenseDetailsByID = async (req, res) => {
  let result = await DetailsByIDService(req, DataModel);
  res.status(200).json(result);
};

