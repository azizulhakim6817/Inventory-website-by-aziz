import DataModel from "../../Module/Expenses/ExpensesTypesModel.js";
import CreateService from "../../Service/user/common/CreateService.js";
import UpdateService from "../../Service/user/common/UpdateService.js";
import DropDownService from "../../Service/user/common/DropDownService.js";
import ListService from "../../Service/user/common/ListService.js";


export const CreateExpenseTypes = async (req, res) => {
  let result = await CreateService(req, DataModel);
  res.status(200).json(result);
};

export const UpdateExpenseTypes = async (req, res) => {
  let result = await UpdateService(req, DataModel);
  res.status(200).json(result);
};

export const ExpenseTypesDropDown = async (req, res) => {
  let result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(result);
};
export const ExpenseTypesList = async (req, res) => {
  let SeachRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [{ Name: SeachRgx }];
  let result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(result);
};
