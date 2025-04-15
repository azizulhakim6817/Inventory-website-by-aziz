const DeleteService = async (req, Model) => {
  try {
    let DeleteID = req.params.id;
    let UserEmail = req.headers.email;

    let QueryObject = {};
    QueryObject["_id"] = DeleteID;
    QueryObject["UserEmail"] = UserEmail;

    let Delete = await Model.deleteMany(QueryObject);

    return { status: "success", data: Delete };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

export default DeleteService;
