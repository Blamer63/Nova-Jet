const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    collection: 'users',
    timestamps: true
});

// Salt password before saving to database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
});

// Compare salted passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
      throw new Error('Password comparison failed');
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;