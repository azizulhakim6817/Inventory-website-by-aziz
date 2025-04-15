const UserDetailsService = async (Request, DataModel) => {
  try {
    const email = Request.headers.email;

    const data = await DataModel.aggregate([{ $match: { email: email } }]);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

export default UserDetailsService;
