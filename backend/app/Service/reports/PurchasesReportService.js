import PurchasesProductsModel from "../../Module/Purchases/PurchasesProductsModel.js";

const PurchasesReportService = async (Request) => {
  try {
    let UserEmail = Request.headers.email;
    let FormData = Request.body.FormData;
    let ToData = Request.body.ToData;
    let data = await PurchasesProductsModel.aggregate([
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
                TotalAmount: { $sum: "$Total" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "products",
                localField: "ProductID",
                foreignField: "_id",
                as: "products",
              },
            },
            {
              $lookup: {
                from: "brands",
                localField: "products.BrandID",
                foreignField: "_id",
                as: "brands",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.CategoriesID",
                foreignField: "_id",
                as: "categories",
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

export default PurchasesReportService;
