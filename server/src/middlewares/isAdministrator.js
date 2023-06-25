/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: "You don't have the permission of the admin" });
    return;
  }
  next();
};
