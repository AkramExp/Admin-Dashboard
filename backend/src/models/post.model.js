import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
    },
    caption: {
      type: String,
    },
    location: {
      type: String,
    },
    tags: [String],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
