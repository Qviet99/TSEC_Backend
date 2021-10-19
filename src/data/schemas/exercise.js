import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  questionIds:[{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  }],
}, {timestamps: true});

export default mongoose.model('Exercise', ExerciseSchema); 