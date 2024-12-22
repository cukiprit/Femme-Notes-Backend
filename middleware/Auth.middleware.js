import jwt from "jsonwebtoken";

export const AuthenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

export const AuthenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "error", errors: "Access token is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error", errors: "Access token is invalid" });
  }
};
