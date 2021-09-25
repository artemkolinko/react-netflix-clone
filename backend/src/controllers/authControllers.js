const {registration, signIn} = require('../services/authService');

const handleErrors = (err) => {
  const errors = {};

  // dublicate error code
  if (err.code === 11000) {
    errors.email = 'This email is already registered';
    return errors;
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signup = async (req, res) => {
  try {
    await registration(req.body);
    res.json({message: 'Profile created successfully'});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({message: errors});
  }
};

const signin = async (req, res) => {
  const {email, password} = req.body;

  try {
    const token = await signIn({email, password});
    res.json({jwt_token: token});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports = {
  signup,
  signin,
};
