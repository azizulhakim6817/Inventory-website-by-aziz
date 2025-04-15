import jwt from "jsonwebtoken";

const CreateToken = async (data) => {
  let Playload = {
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    data: data,
  };
  return jwt.sign(Playload, "SecretKey12345678");
};

export default CreateToken;
