import Post from '@/models/posts';
import { postValidation } from '@/models/posts/validation';
import { pick } from 'lodash';

const crud = {
  // Create post
  async create(ctx, next) {
    const error = postValidation(ctx.request.body);
    if (error) return ctx.body = error;

    let post;
    post = new Post(pick(ctx.request.body, ['title', 'description', 'isPublished', 'authorId']));
    await post.save();

    ctx.body = post;
  },

  // Get posts
  async get(ctx, next) {
    const posts = await Post
      .find()
      .populate('authorId', '-_id name email')
      .select('authorId title')

    ctx.body = posts
  },

  // Delete post
  delete() {

  },

  // Change post
  put() {

  }
};

export default crud;
