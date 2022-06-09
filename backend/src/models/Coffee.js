import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  rating: {
    type: Number,
  },
  ratingNumber: {
    type: Number,
  },
  type: {
    type: String,
  },
  ingredient: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model('coffee', coffeeSchema);
