import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: {type: String, required: true},
});

export default mongoose.model('Topic', TopicSchema); 