import { Comments, INCLUDE_USER, ORDER_DESC } from "../models/comments.js";

class CommentRepository {
  commentCreate = async (comment, userId) => {
    return Comments.create({ comment, userUserId: userId });
  };

  commentGetAll = async () => {
    return Comments.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
  };

  getById = async (commentId) => {
    return Comments.findOne({
      where: { commentId },
      ...INCLUDE_USER,
    });
  };
  commentUpdate = async (comment, commentId) => {
    return Comments.findByPk(commentId, INCLUDE_USER).then((comments) => {
      comments.comment = comment;
      return comments.save();
    });
  };

  commentRemove = async (commentId) => {
    return Comments.findByPk(commentId) //
      .then((comment) => {
        comment.destroy();
      });
  };
}

export default CommentRepository;
