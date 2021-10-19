import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseName: {type: String, required: true},
  courseDescription: {type: String, required: true},
  courseVideos: [{
    videoName: {type: String},
    videoUrl: {type: String},
  }],
  courseLevelId: {
    type: Schema.Types.ObjectId,
    ref: 'Level',
    required: true,
  },
  courseDuration: {type: String, required: true},
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  price: {type: Number, required: true},
}, {timestamps: true});

export default mongoose.model('Course', CourseSchema); 