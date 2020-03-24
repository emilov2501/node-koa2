import Post from '@/models/posts';
import mongoose from 'mongoose';
import Fawn from 'fawn';
import HttpStatus from '@/utils/http-status-adapter';

Fawn.init(mongoose);

export default {
  async fetchLike(ctx, next) {
    const postId = ctx.params.postId;

    try {
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        ctx.status = HttpStatus.notFound;
        ctx.body = {
          success: false,
          message: 'Post not found'
        }
      }

      await likeTransaction(ctx);

    } catch (ex) {
      ctx.status = HttpStatus.badRequest;
      ctx.body = {
        success: false,
        message: ex
      }
    }
  }
}

function likeTransaction(ctx) {
 try {
   new Fawn.Task
    .update('posts', {
      $inc: { likes: +1 }
    })
    .run()

    ctx.status = HttpStatus.OK;
    ctx.body = {
      success: true,
    };

 } catch (ex) {
    ctx.status = HttpStatus.serverError;
    ctx.body = 'Something failed'
 }
}