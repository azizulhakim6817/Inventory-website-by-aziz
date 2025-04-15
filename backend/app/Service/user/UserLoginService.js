import CreateToken from "./../../utility/CreateToken.js";

const UserLoginService = async (Request, DataModel) => {
  try {
    let reqBody = Request.body;
    let data = await DataModel.aggregate([
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]);

    if (data.length > 0) {
      let token = await CreateToken(data[0]["email"]);
      return { status: "success", token: token, data: data[0] };
    } else {
      return { status: "unauthorized" };
    }
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

export default UserLoginService;
