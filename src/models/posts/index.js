import mongoose from 'mongoose';

export const postSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  description: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema({
      name: {
        type: String
      }
    })
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = new mongoose.model('Post', postSchema);

export default Post;
