import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true,
    },
    avatar : {
        type : String,  //cloudinary url
        required : true,
    },
    coverImage : {
        type : String
    },
    watchHistory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String
    },


},{timestamps : true})


userSchema.pre("save",async function(next)
{
    if(this.isModified("password"))
    {
        this.password = bcrypt.hash(this.password,10)
    }
    next
})

userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this.id,
        email : this.email,
        username : this.username,
        fullname : this.fullname,
    },
    process.env.Access_Token_Secret,
    {
        expiresIn : process.env.Access_Token_Expire
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this.id,
        email : this.email,
        username : this.username,
        fullname : this.fullname,
    },
    process.env.Refresh_Token_Secret,
    {
        expiresIn : process.env.Refresh_Token_Expire
    }
)
}

export const User = mongoose.model("User",userSchema)