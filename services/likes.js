import LikeRepository from "../repositories/likes.js";
import jwt from "jsonwebtoken";

class LikeService {
  likeRepository = new LikeRepository();

  getAllLikeService = async (req, res) => {
    try {
      const posts = await this.likeRepository.likeGetAll();
      return res.status(200).json({
        data: [posts],
      });
    } catch (error) {
      return res.status(400).json({
        errorMessage: "좋아요 게시글 조회에 실패하였습니다.",
      });
    }
  };

  updateLikeService = async (req, res, postId) => {
    try {
      const token = req.cookies.Authorization;
      const splitedToken = token.split(" ")[1];
      const decodedToken = jwt.decode(splitedToken);

      const isExistPost = this.likeRepository.likeSearch(postId);
      if (!isExistPost) {
        return res.status(404).json({
          errorMessage: "게시글이 존재하지 않습니다.",
        });
      }

      const isLike = await this.likeRepository.likeCheck(postId);

      if (!isLike) {
        this.likeRepository.likeCreate(postId, decodedToken.userId);
        return res
          .status(200)
          .json({ message: "게시글의 좋아요를 등록하였습니다." });
      } else {
        this.likeRepository.likeDelete(postId, decodedToken.userId);
        return res
          .status(200)
          .json({ message: "게시글의 좋아요를 취소하였습니다." });
      }
    } catch (error) {
      return res.status(400).json({
        errorMessage: "게시글 좋아요에 실패하였습니다.",
      });
    }
  };
}

export default LikeService;
