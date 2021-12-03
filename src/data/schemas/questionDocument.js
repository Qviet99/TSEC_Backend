import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionDocument = new Schema({
  documentType: {type: String, required: true},
  documentContent: {type: String, required: true},
});

export default mongoose.model('Report', QuestionDocument); 