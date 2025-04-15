const ListService = async (Request, DataModel, SearchArray) => {
  try {
    let UserEmail = Request.headers.email;
    let pageNo = Number(Request.params.pageNo);
    let perPage = Number(Request.params.perPage);
    let searchValu = Request.params.searchKeyword;

    let skipRow = (pageNo - 1) * perPage;
    let data;

    if (searchValu !== "0") {
      let SearchQuery = { $or: SearchArray };
      data = await DataModel.aggregate([
        { $match: { UserEmail: UserEmail } },
        { $match: SearchQuery },
        {
          $facet: {
            Total: [{ $count: "count" }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        { $match: { UserEmail: UserEmail } }, 
        {
          $facet: {
            Total: [{ $count: "count" }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

export default ListService;
