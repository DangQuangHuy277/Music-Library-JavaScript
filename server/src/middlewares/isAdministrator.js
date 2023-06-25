/* eslint-disable consistent-return */
module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
