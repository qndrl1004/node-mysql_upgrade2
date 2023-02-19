import { Likes } from "../models/likes.js";
import { Posts, LIKE_COUNT } from "../models/posts.js";

class LikeRepository {
  likeGetAll = async () => {
    return await Posts.findAll({ ...LIKE_COUNT, group: "postId" });
  };

  likeSearch = async (postId) => {
    return Posts.findByPk(postId);
  };

  likeCheck = async (postId) => {
    return Likes.findOne({ postPostId: postId });
  };

  likeCreate = async (postId, userId) => {
    Likes.create({ postPostId: postId, userUserId: userId });
  };

  likeDelete = async (postId, userId) => {
    Likes.destroy({
      where: { postPostId: postId, userUserId: userId },
    });
  };
}

export default LikeRepository;
