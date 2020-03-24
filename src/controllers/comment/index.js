import Comment from '@/models/comments';
import Post from '@/models/posts';
import User from '@/models/user';
import { commentValidation } from '@/models/comments/validation';
import HttpStatus from '@/utils/http-status-adapter';


const crud = {
  async get(ctx, next) {
    const postId = ctx.request.body.postId;
    try {
      const comments = await Comment.find({ postId })

      ctx.status = HttpStatus.OK;
      ctx.body = {
        data: comments,
        length: comments.length,
        success: true
      }
    } catch (ex) {
      ctx.status = HttpStatus.badRequest;
      ctx.body = {
        success: false,
        message: ex
      }
    }
  },

  async create(ctx, next) {
    const error = commentValidation(ctx.request.body);
    if (error) return ctx.body = error;

    try {
      const post = await Post.findOne({ _id: ctx.request.body.postId });
      const author = await User.findOne({ _id: ctx.request.body.authorId });
      if (post && author) {
        const comment = new Comment({
          postId: post._id,
          author: {
            name: author.name,
            email: author.email
          },
          body: ctx.request.body.body
        });

        comment.save();

        ctx.status = HttpStatus.OK;
        ctx.body = {
          success: true
        };
      }
    } catch (ex) {
      ctx.status = HttpStatus.badRequest;
      ctx.body = {
        success: false,
        message: ex
      }
    }
  }
}

export default crud;
