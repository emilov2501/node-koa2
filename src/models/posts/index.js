import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const postSchema = new Schema({
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
      userId: {
        type: mongoose.Schema.Types.ObjectId
      },
      name: {
        type: String
      }
    })
  },
  comments: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0,
    minlength: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = new mongoose.model('Post', postSchema);

export default Post;
