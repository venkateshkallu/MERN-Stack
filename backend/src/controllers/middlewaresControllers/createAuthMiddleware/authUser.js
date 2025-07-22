const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, { user, databasePassword, password, UserPasswordModel }) => {
  try {
    const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        result: null,
        message: 'Invalid credentials.',
      });
    }

    // ✅ Set token expiration duration
    const duration = req.body.remember === true || req.body.remember === 'true' ? '8760h' : '24h';

    // ✅ Create JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: duration }
    );

    // ✅ Save login session token in DB
    await UserPasswordModel.findOneAndUpdate(
      { user: user._id },
      { $push: { loggedSessions: token } },
      {
        new: true,
      }
    ).exec();

    // ✅ Return success response
    return res.status(200).json({
      success: true,
      result: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        role: user.role,
        email: user.email,
        photo: user.photo,
        token: token,
        maxAge: req.body.remember ? 365 : null,
      },
      message: 'Successfully login user',
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Internal server error during login.',
    });
  }
};

module.exports = authUser;
