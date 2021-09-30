const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const regExpEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [regExpEmail, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Minimum password length is 6 characters'],
      maxlength: [20, 'Maximum password length is 20 characters'],
      trim: true,
    },
    favorites: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  },
);

async function hashPassword(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
}

// hook before saving (next)
// hash password before saving and updeting
userSchema.pre('save', hashPassword);

// hook after saving (doc, next)
// userSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
