import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = { sub: userId };

  const options = {
    expiresIn: "3d",
  };

  const secretOrPrivateKey = process.env.JWT_SECRET;

  const jwtToken = jwt.sign(payload, secretOrPrivateKey, options);

  if (!jwtToken) return null;

  if (jwtToken) return jwtToken;

  return jwtToken;
};

export { generateToken };
