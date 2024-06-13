const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: false },
  phoneNumber: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  votingId: { type: String, required: false },
  votingPassword: { type: String, required: false },
  verificationCode: { type: String,required: false } 
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
