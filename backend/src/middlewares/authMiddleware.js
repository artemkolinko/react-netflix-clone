const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'secretForToken';

const authMiddleware = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({message: 'Please, provide "authorization" header'});
  }

  const token = authorization.split(' ').pop();

  if (!token) {
    return res.status(401).json({message: 'Please, include token to request'});
  }

  try {
    const tokenPayload = jwt.verify(token, secret);
    const {_id} = tokenPayload;
    req.user = {
      userId: _id,
    };

    next();
  } catch (err) {
    res.status(401).json({message: err.message});
  }
};

module.exports = {
  authMiddleware,
};
