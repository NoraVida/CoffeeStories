import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  publish_date: {
    type: Date,
  },
});

export default mongoose.model('article', articleSchema);
