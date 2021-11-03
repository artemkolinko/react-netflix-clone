const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {authMiddleware} = require('./middlewares/authMiddleware');

const authRouter = require('./routes/authRouter');
const meRouter = require('./routes/meRouter');
const showsRouter = require('./routes/showsRouter');
const searchRouter = require('./routes/searchRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/v1/auth', authRouter);

app.use(authMiddleware);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/shows', showsRouter);
app.use('/api/v1/users/me', meRouter);

app.get('*', (req, res) => {
  res.status(404).json({
    error: 'not found',
  });
});

module.exports = app;
