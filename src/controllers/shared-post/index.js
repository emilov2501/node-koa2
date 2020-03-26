import { sharedPostValidation } from "@/models/posts/shared/validation";
import SharedPost from '@/models/posts/shared';
import User from '@/models/user'
import Post from '@/models/posts';
import { HttpStatus } from "@/utils";

export default {
  async sharingPost(ctx, next) {
    const postId = ctx.params.id;
    try {
      const token = ctx.decoded;
      const user = await User.findOne({ _id: token.user });
      if(!user) return ctx.body = 'User not found';

      const post = await Post.findOne({ _id: postId });
      if (!post) return ctx.body = 'Post not found'

      const result = new SharedPost({
        post: post._id,
        user: user._id
      });

      await result.save();

      ctx.status = HttpStatus.OK;
      ctx.body = {
        success: true,
        data: result
      }

    } catch(ex) {
      ctx.status = HttpStatus.serverError;
      ctx.body = {
        success: false,
        message: ex.message
      };
    }
  },

  async shareGet(ctx, next) {
    const posts = await SharedPost
      .find()
      .populate('post user', '-password')
    
    ctx.body = {
      posts
    }
  }
};
