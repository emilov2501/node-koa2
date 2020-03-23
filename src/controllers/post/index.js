import Post from '@/models/posts';
import User from '@/models/user';
import { postValidation } from '@/models/posts/validation';
import { pick } from 'lodash';
import { Response, HttpStatus } from '@/utils';


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
      
      return new Response(ctx)
        .sendStatus(HttpStatus.OK)
        .sendMessage({
          data: post,
          success: true
        })
      
    } catch(ex) {
      return new Response(ctx)
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
      .select('author description title')

    return new Response(ctx)
      .sendStatus(HttpStatus.OK)
      .sendMessage({
        data: posts,
        success: true
      })
  },

  // Delete post
  async delete(ctx, next) {
    const postId = ctx.params.id;
    
    try {
      const post = await Post.findOneAndDelete({ _id: postId });
      if (!post) {
        return new Response(ctx)
          .sendStatus(HttpStatus.notFound)
          .sendMessage({
            data: `Post ${postId} not found`,
            success: false
          });
      }

      return new Response(ctx)
        .sendStatus(HttpStatus.OK)
        .sendMessage({
          success: true
        });
      
    } catch (ex) {
      return new Response(ctx)
        .sendStatus(HttpStatus.badRequest)
        .sendMessage({
          data: 'DELETE: _id incorrect',
          success: false
        })
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
        return ctx.throw(HttpStatus.notFound, `Post ${query.id} not found`, { post })
      }

      return new Response(ctx)
        .sendStatus(HttpStatus.OK)
        .sendMessage({
          success: true
        });
      
    } catch (ex) {
      return ctx.throw(HttpStatus.badRequest, ex)
    }
  }
};

export default crud;
