import Post from '@/models/posts';
import mongoose from 'mongoose';
import Fawn from 'fawn';
import HttpStatus from '@/utils/http-status-adapter';
import Joi from 'joi';

Fawn.init(mongoose, 'posts');

function likeValidation(body) {
  function validate() {
    const schema = {
      value: Joi.number().integer().min(-1).max(1).required()
    }
    
    return Joi.validate(body, schema);
  }
  
  const { error } = validate();
  return error ? error.details[0].message : ''
};

export default {
  async fetchLike(ctx, next) {
    const error = likeValidation(ctx.request.body);
    if (error) return ctx.body = error;

    const postId = ctx.params.id;
    const value = ctx.request.body.value;

    try {
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        ctx.status = HttpStatus.notFound;
        ctx.body = {
          success: false,
          message: 'Post not found'
        }
      }

      await likeTransaction(ctx, { postId: post._id, value });

    } catch (ex) {
      ctx.status = HttpStatus.badRequest;
      ctx.body = {
        success: false,
        message: ex.message
      }
    }
  }
}

function likeTransaction(ctx, { postId, value }) {
  
 try {
   new Fawn.Task()
    .update('posts', { _id: postId }, {
      $inc: { likes: value }
    })
    .run();

    ctx.status = HttpStatus.OK;
    ctx.body = {
      success: true,
    };

 } catch (ex) {
    ctx.status = HttpStatus.serverError;
    ctx.body = 'Something failed'
 }
}
