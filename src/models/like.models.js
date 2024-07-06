import mongoose, {Schema} from "mongoose";

const likeSchema=new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Like=mongoose.model("Like",likeSchema)
