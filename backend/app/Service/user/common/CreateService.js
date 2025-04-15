const CreateService = async (Request, DataModel) => {
  try {
    let postBody = Request.body;
    postBody.UserEmail = Request.headers.email;

    let data = await DataModel.create(postBody);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

export default CreateService;
