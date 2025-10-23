import jwt from "jsonwebtoken";

const validUserMiddleware = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
  try {
    // Accept "Authorization: Bearer <token>"
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication token missing or improperly formatted"
      });
    }
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ensure user ID exists
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: "Invalid or expired token"
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    // Improved error handling
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Session expired, please login"
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Token malformed or invalid"
      });
    }
    console.error('Auth middleware caught:', error);
    res.status(500).json({
      message: "Internal authentication service error"
    });
  }
};

export default validUserMiddleware;
