import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  questionIds:[{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  }],
}, {timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }});

ExerciseSchema.virtual('questionList', {
  ref: 'Question',
  localField: 'questionIds',
  foreignField: '_id',
});


export default mongoose.model('Exercise', ExerciseSchema); 