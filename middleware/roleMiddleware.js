const roleMiddleware = (roles) => {
  return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access denied. You do not have permission." });
      }
      next();
  };
};

module.exports = roleMiddleware;
