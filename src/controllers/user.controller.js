import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    //get user data from the frontend
    //username,email,fullname,avatar
    //validation of user data(not empty, email format)
    //check if user already exists in the database (username or email already exists)
    //check for image , check for avatar image
    //upload them to cloudinary, check avatar image is uploaded successfully or not
    //create user object --create entry in the database
    //remove password and response token field from the user object before sending the response
    //check for user creation
    //return response to the frontend (success or failure)

    console.log("Entire req.body received:", req.body);
    const { username, email, fullname, password } = req.body
    console.log("email : ", email);

    // If any field is falsy (undefined/null/"") or empty strings, throw.
    if (
        [fullname, email, username, password].some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [
            {email},{username}
        ]
    })

    if(existedUser){
        throw new ApiError(400,"User already exists")
    }


    console.log(req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar image is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(500,"Avatar image upload failed")
    }
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"User registration failed")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export { registerUser }