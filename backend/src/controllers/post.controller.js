import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { Save } from "../models/save.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Like } from "../models/like.model.js";

export const createPost = asyncHandler(async (req, res) => {
  const { caption, location, tags } = req.body;
  const userId = req.user._id;
  const imageLocalPath = req.file.path;

  const imageFile = await uploadOnCloudinary(imageLocalPath);

  if (!imageFile)
    throw new ApiError(400, "Something went wrong while uploading image");

  const tagsArray = tags.split(",");

  const post = await Post.create({
    userId,
    caption,
    tags: tagsArray,
    location,
    imageUrl: imageFile.url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post Created Successfully"));
});

export const getRecentPosts = asyncHandler(async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              username: 1,
              imageUrl: 1,
              name: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        user: {
          $first: "$user",
        },
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: {
          $map: {
            input: "$likes",
            as: "like",
            in: "$$like.userId",
          },
        },
      },
    },
    {
      $project: {
        userId: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 20,
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Recent posts fetched successfully"));
});

export const toggleSave = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  const findPost = await Save.findOne({ userId, postId });

  if (findPost) {
    const deletedSave = await Save.findByIdAndDelete(findPost._id);

    return res
      .status(200)
      .json(new ApiResponse(200, deletedSave, "Post removed from saved posts"));
  } else {
    const createSave = await Save.create({ userId, postId });

    return res
      .status(200)
      .json(new ApiResponse(200, createSave, "Post added to saved posts"));
  }
});

export const getSavedPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const posts = await Save.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "postId",
        foreignField: "_id",
        as: "post",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    username: 1,
                    imageUrl: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              user: {
                $first: "$user",
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        post: {
          $first: "$post",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$post",
      },
    },
    {
      $project: {
        userId: 0,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: {
          $map: {
            input: "$likes",
            as: "like",
            in: "$$like.userId",
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Saved posts fetched successfully"));
});

export const toggleLikePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  const findLike = await Like.findOne({ userId, postId });

  if (findLike) {
    await Like.findByIdAndDelete(findLike._id);
    return res.status(200).json(new ApiResponse(200, {}, "Post Disliked"));
  } else {
    await Like.create({ userId, postId });
    return res.status(200).json(new ApiResponse(200, {}, "Post Liked"));
  }
});

export const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "user",
        pipeline: [
          {
            $project: { name: 1, username: 1, imageUrl: 1 },
          },
        ],
      },
    },
    {
      $addFields: {
        user: {
          $first: "$user",
        },
      },
    },
    { $project: { userId: 0 } },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: {
          $map: {
            input: "$likes",
            as: "like",
            in: "$$like.userId",
          },
        },
      },
    },
  ]);

  if (!post) throw new ApiError(400, "Post does not exists");

  return res
    .status(200)
    .json(new ApiResponse(200, post[0], "Post fetched successfully"));
});

export const updatePost = asyncHandler(async (req, res) => {
  const { caption, location, tags } = req.body;
  const { postId } = req.params;
  const userId = req.user._id;

  const findPost = await Post.findOne({ $and: [{ _id: postId }, { userId }] });

  if (!findPost) throw new ApiError(400, "Unthorized Request");

  const tagsArray = tags.split(",");

  const post = await Post.findByIdAndUpdate(
    findPost._id,
    {
      caption,
      location,
      tags: tagsArray,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post Updated Successfully"));
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const findPost = await Post.findOne({ $and: [{ _id: postId }, { userId }] });

  if (!findPost) throw new ApiError(400, "Unthorized Request");

  await Post.findByIdAndDelete(findPost._id);
  await Save.deleteOne({ postId });
  await Like.deleteOne({ postId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post Deleted Successfully"));
});
