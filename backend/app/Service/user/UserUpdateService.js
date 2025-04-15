const UserUpdateService = async (Request, DataModel) => {
  try {
    let email = Request.params.email;
    let reqBody = Request.body;

    let data = await DataModel.updateOne({ email: email }, { $set: reqBody });
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
export default UserUpdateService;
