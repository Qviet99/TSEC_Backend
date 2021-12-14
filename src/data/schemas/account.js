import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, required: true},
  avatarUrl: {type: String, required: true},
  lastExamResult: {type: Number},
  registeredCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  reportIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Report',
  }],
}, {timestamps: true});

export default mongoose.model('Account', AccountSchema); 