import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sharedSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const SharedPost = new mongoose.model('Shares', sharedSchema);

export default SharedPost;