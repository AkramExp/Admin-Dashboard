import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Follow } from "../models/follow.model.js";

async function generateAccessToken(userId) {
  try {
    const user = await User.findById(userId);
    const userToken = user.generateUserToken();

    await user.save({ validateBeforeSave: false });

    return userToken;
  } catch (error) {
    throw new ApiError(
      400,
      error.message ||
        "Something went wrong while generating access and refresh tokens."
    );
  }
}

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const findUser = await User.findOne({ username });

  if (findUser)
    throw new ApiError(400, "User with the username already exists");

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  const userToken = await generateAccessToken(user._id);

  return res
    .cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    })
    .status(200)
    .json(new ApiResponse(200, { user, userToken }, "Registered Successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const findUser = await User.findOne({ username });

  if (!findUser) throw new ApiError(400, "Invalid Credentials");

  const isPasswordValid = await findUser.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(400, "Invalid Credentials");

  const userToken = await generateAccessToken(findUser._id);

  const loggedInUser = await User.findById(findUser._id).select("-password");

  return res
    .cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, userToken },
        "Logged In Successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const options = { httpOnly: true, secure: true, sameSite: "None", path: "/" };

  return res
    .status(200)
    .clearCookie("userToken", options)
    .json(new ApiResponse(200, {}, "Logged Out Successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "saves",
        localField: "_id",
        foreignField: "userId",
        as: "savedPosts",
      },
    },
    {
      $addFields: {
        savedPosts: {
          $map: {
            input: "$savedPosts",
            as: "savedPost",
            in: "$$savedPost.postId",
          },
        },
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "followerId",
        as: "following",
      },
    },
    {
      $addFields: {
        following: {
          $map: {
            input: "$following",
            as: "follow",
            in: "$$follow.followingId",
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, user[0], "User fetched successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "followerId",
        as: "followingCount",
      },
    },
    {
      $addFields: {
        followingCount: {
          $size: "$followingCount",
        },
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "followingId",
        as: "followerCount",
      },
    },
    {
      $addFields: {
        followerCount: {
          $size: "$followerCount",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, user[0], "User fetched successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, username, bio, email } = req.body;
  let imageUrl = req.file.path;
  const userId = req.user._id;

  if (imageUrl) {
    const localFilePath = req.file.path;

    const imageFile = await uploadOnCloudinary(localFilePath);

    if (!imageFile)
      throw new ApiError(400, "Something went wrong while uploading image");

    imageUrl = imageFile.url;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      name,
      username,
      imageUrl,
      bio,
      email,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile Updated Successfully"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let users;

  if (!search === "") {
    users = await User.find();
  } else {
    users = await User.aggregate([
      {
        $match: {
          name: { $regex: search, $options: "i" },
        },
      },
    ]);
  }

  return res.status(200).json(new ApiResponse(200, users, "All users fetched"));
});

export const toggleFollow = asyncHandler(async (req, res) => {
  const followerId = req.user._id;
  const { followingId } = req.params;

  const findFollow = await Follow.findOne({
    $and: [{ followerId }, { followingId }],
  });

  if (findFollow) {
    await Follow.findByIdAndDelete(findFollow._id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User Removed from Following"));
  } else {
    await Follow.create({ followerId, followingId });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User Added to Following"));
  }
});

export const getFollowing = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const following = await Follow.aggregate([
    {
      $match: {
        followerId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followingId",
        foreignField: "_id",
        as: "following",
        pipeline: [
          {
            $project: {
              username: 1,
              name: 1,
              imageUrl: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        following: { $first: "$following" },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$following",
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, following, "Following fetched successfully"));
});

export const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const followers = await Follow.aggregate([
    {
      $match: {
        followingId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followerId",
        foreignField: "_id",
        as: "followers",
        pipeline: [
          {
            $project: {
              username: 1,
              name: 1,
              imageUrl: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        followers: { $first: "$followers" },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$followers",
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, followers, "Followersfetched successfully"));
});
