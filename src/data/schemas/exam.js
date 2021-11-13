import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  questionIds:[{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  }],
  examTime: {type: String, required: true},
}, {timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }});

ExamSchema.virtual('questionList', {
  ref: 'Question',
  localField: 'questionIds',
  foreignField: '_id',
});


export default mongoose.model('Exam', ExamSchema); 