import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    //console.log("token from middleware",token);

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    //console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({
        message: "Please login to continue",
        error: true,
        success: false,
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      //console.log("decoded", decoded);
      req.userId = decoded._id;
      next();
    } catch (verifyError) {
      console.error("JWT verification error:", verifyError.message);
      return res.status(401).json({
        message: error.message,
        error: true,
        success: false,
      });
    }
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(500).json({
      message: "Internal server error in auth middleware",
      error: true,
      success: false,
    });
  }
};
