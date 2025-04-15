const ReturnSummaryService = async (req, ParentModel) => {
  try {
    const UserEmail = req.headers.email;

    const data = await ParentModel.aggregate([
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
                TotalAmount: { $sum: "$GrandTotal" },
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
                TotalAmount: { $sum: "$GrandTotal" },
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

export default ReturnSummaryService;
