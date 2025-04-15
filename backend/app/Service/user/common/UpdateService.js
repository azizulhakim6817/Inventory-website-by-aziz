const UpdateService = async (Request, BrandModel) => {
  try {
    let UserEmail = Request.headers.email;
    let id = Request.params.id;
    let postBody = Request.body;

    let data = await BrandModel.updateOne(
      { _id: id, UserEmail: UserEmail },
      postBody
    );
    return { stauts: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

export default UpdateService;
