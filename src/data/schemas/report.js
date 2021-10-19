import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  reportContent: {type: String, required: true},
});

export default mongoose.model('Report', ReportSchema); 