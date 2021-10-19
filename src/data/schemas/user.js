import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  fullName: {type: String, required: true},
  phoneNumber: {type: String},
  dayOfBirth: {type: Date, default: new Date()},
  gender: {type: String},
  address: {type: String},
}, {timestamps: true});

export default mongoose.model('User', UserSchema); 