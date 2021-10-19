import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  questionIds:[{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  }],
  examTime: {type: String, required: true},
}, {timestamps: true});

export default mongoose.model('Exam', ExamSchema); 