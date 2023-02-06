import dotenv from "dotenv";
import db from "./schemas/index.js";
import express from "express";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
dotenv.config();

//import commentRouter from "./routes/comments.js";
const app = express();

//나머지 불러오기
app.use(express.json());

//서버,db연결
db();

//연결
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

//에러
app.use((err, req, res) => {
  res.status(400).send({ message: "데이터 형식이 올바르지 않습니다." });
});

app.use((err, req, res) => {
  res.status(404).send({ message: "게시글 조회에 실패하였습니다." });
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
