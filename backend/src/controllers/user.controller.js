import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
  console.log(req.body);

  const findUser = await User.findOne({ username });

  if (findUser)
    throw new ApiError(400, "User with the username already exists");

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Registered Successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});
