import SQ, { BelongsTo } from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;

export const Likes = sequelize.define(
  "likes",
  {
    likeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);
Likes.belongsTo(User);
