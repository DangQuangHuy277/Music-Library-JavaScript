/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerValidation = require('../utils/validation/register');
const loginValidation = require('../utils/validation/login');
const { User } = require('../models');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    // Validate the request body
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error });

    const { username, email, password } = req.body;

    // Check if the user is already in the database
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    // hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    // Validate the request body
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error });

    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return res.status(400).json({ message: 'Account is not exist' });

    // Check if password is correct
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) return res.status(400).json({ message: 'Password is incorrect' });

    // Create and assign a token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1h',
      },
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
