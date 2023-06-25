/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization || req.query.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user) return res.status(401).json({ message: 'User doesn\'t exist in database' });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
