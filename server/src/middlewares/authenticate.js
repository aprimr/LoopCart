import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

export default authenticate;
