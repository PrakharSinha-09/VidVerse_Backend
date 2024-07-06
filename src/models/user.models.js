import mongoose, {Schema} from "mongoose";

const userSchema=new Schema({
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },

        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },

        avatar:{
            type: String,       //Cloudinary URL / S3 URL
            required:true,
        },

        coverImage:{
            type: String        //Cloudinary URL
        },

        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref:"Video"                         //this should be the name of the schema you are referring... not like you stored in the variable named videoSchema, so you will write that.. whatever is the name of the Schema that you pass as a first arg in the mongoose.model, that should be the name
            }
        ],

        password:{
            type:String,
            required:[true,"password is required!"]     //second arg to send msg
        },

        refreshToken:{
            type:String
        }
    },
    {timestamps:true}                                  //you will get 2 more fields: createdAt & updatedAt
)

export const User=mongoose.model("User",userSchema)