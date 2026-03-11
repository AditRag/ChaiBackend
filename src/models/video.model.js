import mongoose from "mongoose"


const videoSchema = new mongoose.Schema({
    videoFile : {
        type : String,
        required :true
    },
    thumbnail : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    views : {
        type : Number,
        default : 0
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

},
{
    timestamps : true
})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)



// bycrpt help in hashing the password
