const UserCreateRegiService = async (Request, DataModel) => {
  try {
    let reqBody = Request.body;
    let email = reqBody.email;

    let EmilExist = await DataModel.findOne({ email: email });
    if (EmilExist) {
      return { status: "Email is Already exist" };
    }
    let data = await DataModel.create(reqBody);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

export default UserCreateRegiService;
