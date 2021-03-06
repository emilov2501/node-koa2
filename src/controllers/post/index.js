import Post from '@/models/posts';
import User from '@/models/user';
import { postValidation } from '@/models/posts/validation';
import { pick } from 'lodash';
import { HttpStatus } from '@/utils';

const crud = {
  // Create post
  async create(ctx, next) {
    const error = postValidation(ctx.request.body);
    if (error) return ctx.body = error;

    try {
      const token = ctx.decoded;
      const user = await User.findOne({ _id: token.user });

      const post = new Post({
        ...pick(ctx.request.body, ['title', 'description', 'isPublished']),
        author: {
          name: user.name,
          userId: user._id
        }
      });
      
      await post.save();
      
      ctx.status = HttpStatus.OK;
      ctx.body = {
        data: post,
        success: true
      }
      
    } catch(ex) {
      ctx.status = HttpStatus.serverError;
      ctx.body = {
        message: `Author is not found. ${ex.message}`,
        success: false
      };
    }
  },

  // Get posts
  async all(ctx, next) {
    const posts = await Post
      .find()

    ctx.status = HttpStatus.OK;
    ctx.body = {
      data: posts,
      length: posts.length,
      success: true
    }
  },

  async get(ctx) {
    const postId = ctx.params.id;
    try {
      const post = await Post
        .findOne({ _id: postId })
        .select('-author')

      if (!post) {
        ctx.status = HttpStatus.notFound
        ctx.body = {
          success: false,
          message: 'Post not found'
        }
      }

      ctx.status = HttpStatus.OK;
      ctx.body = {
        data: post,
        success: true
      }
      
    } catch (ex) {
      ctx.status = HttpStatus.badRequest
      ctx.body = {
        success: false,
        message: ex
      }
    }
  },

  // Delete post
  async delete(ctx, next) {
    const postId = ctx.params.id;
    
    try {
      const post = await Post.findOneAndDelete({ _id: postId });
      if (!post) {
        ctx.status = HttpStatus.notFound;
        ctx.body = {
          message: `Post not found`,
          success: false
        };
        return;
      }

      ctx.status = HttpStatus.OK;
      ctx.body = {
        success: true
      }
      
    } catch (ex) {
      ctx.status = HttpStatus.badRequest;
      ctx.body = {
        message: ex.message,
        success: false
      }
    }
  },

  // Change post
  async put(ctx, next) {
    const query = {
      id: ctx.params.id,
      title: ctx.request.body.title,
      description: ctx.request.body.description
    }
    
    try {
      const post = await Post.findOneAndUpdate({ _id: query.id }, {
        ...pick(query, ['title', 'description'])
      }, { new: true });

      if (!post) {
        ctx.status = HttpStatus.notFound;
        ctx.body = {
          success: false,
          message: `Post ${post} is not found`
        }
        return;
      }

      ctx.status = HttpStatus.OK;
      ctx.body = {
        data: post,
        success: true
      }
      
    } catch (ex) {
      ctx.status = HttpStatus.badRequest;
      ctx.body = {
        message: ex.message,
        success: false
      }
    }
  }
};  

export default crud;
