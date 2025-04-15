const SalesSummaryService = async (req, DataModel) => {
  try {
    const UserEmail = req.headers.email;

    const data = await DataModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: null,
                TotalAmount: { $sum: "$Amount" },
              },
            },
          ],
          Last30Days: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                  },
                },
                TotalAmount: { $sum: "$Amount" },
              },
            },
            { $sort: { _id: 1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);

    const result = data[0] || { Total: [], Last30Days: [] };

    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

export default SalesSummaryService;
