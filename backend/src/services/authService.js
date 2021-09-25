const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'secretForToken';

const User = require('../models/User');

const registration = async ({email, password}) => {
  // if (!password) {
  //   throw new Error('Password is required');
  // }

  // const user = new User({
  //   email,
  //   password: await bcrypt.hash(password, 10),
  //   role,
  // });
  // await user.save();

  await User.create({email, password});
};

const signIn = async ({email, password}) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const {_id} = user;
  const token = await jwt.sign({_id}, secret, {expiresIn: '7d'});

  return token;
};

module.exports = {
  registration,
  signIn,
};
