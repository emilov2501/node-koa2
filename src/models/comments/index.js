import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  },
  author: mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String
    }
  }),
  body: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Comment = new mongoose.model('Comment', commentSchema);

export default Comment;
