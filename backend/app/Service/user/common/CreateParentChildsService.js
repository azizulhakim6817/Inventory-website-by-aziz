import mongoose from "mongoose";

const CreateParentChildsService = async (
  Request,
  ParentModel,
  ChildsModel,
  JoinPropertyName
) => {
  // Create Transaction Session
  const session = await mongoose.startSession();

  try {
    // Begin Transaction
    await session.startTransaction();

    // First Database Process => Parent Creation
    let Parent = Request.body.Parent;
    Parent.UserEmail = Request.headers.email;
    let ParentArray = await ParentModel.create([Parent], { session });
    let ParentCreation = ParentArray[0];

    // Second Database Process => Childs Creation
    if (ParentCreation._id) {
      try {
        let Childs = Request.body.Childs;
        // Assign Parent ID to each child
        for (let element of Childs) {
          element[JoinPropertyName] = ParentCreation._id; // Corrected here
          element["UserEmail"] = Request.headers.email;
        }

        // Insert Childs into database
        let ChildsCreation = await ChildsModel.insertMany(Childs, { session });

        // Commit transaction only if everything is successful
        await session.commitTransaction();
        session.endSession();

        return {
          status: "success",
          Parent: ParentCreation,
          Childs: ChildsCreation,
        };
      } catch (error) {
        // Rollback Transaction if any error occurs
        await session.abortTransaction();
        session.endSession();

        await ParentModel.deleteOne({ _id: ParentCreation._id }, { session });

        return { status: "fail", data: "Child Creation Failed!" };
      }
    } else {
      return { status: "fail", data: "Parent Creation Failed!" };
    }
  } catch (error) {
    // Rollback Transaction if any error happens
    if (session.inTransaction()) {
      await session.abortTransaction();
      session.endSession();
    }
    return { status: "fail", data: error.toString() };
  }
};

export default CreateParentChildsService;
