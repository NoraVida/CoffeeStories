import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coffee',
  },
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  ratingNumber: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

export default mongoose.model('rating', ratingSchema);
