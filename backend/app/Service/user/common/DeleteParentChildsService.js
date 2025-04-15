import mongoose from "mongoose";

const DeleteParentChildService = async (
  req,
  ParentModel,
  ChildsModel,
  JoinPropertyName
) => {
  const session = await mongoose.startSession();

  try {
    //Begin Transaction.........................
    await session.startTransaction();

    //Parent - Child creation....................
    let DeleteID = req.params.id;
    let UserEmail = req.headers.email;

    let ChildQueryObject = {};
    ChildQueryObject[JoinPropertyName] = DeleteID;
    ChildQueryObject["UserEmail"] = UserEmail;

    let ParentQueryObject = {};
    ParentQueryObject["_id"] = DeleteID;
    ParentQueryObject["UserEmail"] = UserEmail;

    // Remove child ............
    let ChildDelete = await ChildsModel.deleteMany(ChildQueryObject).session(
      session
    );

    // Remonve Parent.................
    let ParentDelete = await ParentModel.deleteMany(ParentQueryObject).session(
      session
    );

    // commit Transaction....................
    await session.commitTransaction();
    session.endSession();

    return { status: "success", Parent: ParentDelete, Childs: ChildDelete };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { status: "fail", data: error.toString() };
  }
};

export default DeleteParentChildService;
