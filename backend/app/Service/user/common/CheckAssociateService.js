const CheckAssociateService = async (QueryObject, AssociateModel) => {
  try {
    let data = await AssociateModel.aggregate([{ $match: QueryObject }]);
    return data.length > 0;
  } catch (error) {
    return { status: "success", data: error.toString() };
  }
};

export default CheckAssociateService;
