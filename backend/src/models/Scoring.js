import mongoose from 'mongoose';

const scoringSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coffee',
  },
  scores: {
    type: Array,
  },
  average: {
    type: Number,
  },
  ratingNumber: {
    type: Number,
  },
});

export default mongoose.model('scoring', scoringSchema);
