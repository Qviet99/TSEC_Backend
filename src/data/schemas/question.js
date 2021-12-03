import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  type: {type: String, required: true},
  questionDocumentId: {
    type: Schema.Types.ObjectId,
    ref: 'QuestionDocument',
  } ,
  questionContent: {type: String, required: true},
  answerChoices: [{type: String, required: true}],
  answerRight: {type: String, required: true},
  mark: {type: Number, required: true},
}, {timestamps: true});

export default mongoose.model('Question', QuestionSchema); 