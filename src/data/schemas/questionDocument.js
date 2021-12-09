import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionDocument = new Schema({
  documentTitle: {type: String, required: true},
  documentType: {type: String, required: true},
  documentContent: {type: String, required: true},
  documentImageUrl: {type: String},
});

export default mongoose.model('QuestionDocument', QuestionDocument); 