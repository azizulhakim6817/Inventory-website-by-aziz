import ExpensesModel from "../../Module/Expenses/ExpensesModel.js";

const ExpenseReportService = async (Request) => {
  try {
    let UserEmail = Request.headers.email;
    let FormData = Request.body.FormData;
    let ToData = Request.body.ToData;
    let data = await ExpensesModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
          createdAt: {
            $gte: new Date(FormData),
            $lte: new Date(ToData),
          },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$Amount" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "expensetypes",
                localField: "TypeID",
                foreignField: "_id",
                as: "Type",
              },
            },
          ],
        },
      },
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

export default ExpenseReportService;
