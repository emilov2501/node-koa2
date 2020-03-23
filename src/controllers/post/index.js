import Post from '@/models/posts';
import User from '@/models/user';
import { postValidation } from '@/models/posts/validation';
import { pick } from 'lodash';
import { HandleResponse, HttpStatus } from '@/utils';


const crud = {
  // Create post
  async create(ctx, next) {
    const error = postValidation(ctx.request.body);
    if (error) return ctx.body = error;

    try {
      const user = await User.findOne({ _id: ctx.request.body.authorId });

      const post = new Post({
        ...pick(ctx.request.body, ['title', 'description', 'isPublished']),
        author: {
          name: user.name
        }
      });
      
      await post.save();
      
      return new HandleResponse(ctx)
        .sendStatus(HttpStatus.OK)
        .sendMessage({
          data: post,
          success: true
        })
      
    } catch(ex) {
      return new HandleResponse(ctx)
        .sendStatus(HttpStatus.notFound)
        .sendMessage({
          data: 'author not founded'
        });
    }
  },

  // Get posts
  async get(ctx, next) {
    const posts = await Post
      .find()
      .select('author title')

    return new HandleResponse(ctx)
      .sendStatus(HttpStatus.OK)
      .sendMessage({
        data: posts,
        success: true
      })
  },

  // Delete post
  delete() {

  },

  // Change post
  put() {

  }
};

export default crud;
