import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  levelMinPoint: {type: Number, required: true},
  levelMaxPoint: {type: Number, required: true},
}, {timestamps: true});

export default mongoose.model('Level', LevelSchema); 