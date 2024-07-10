import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

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

//this is what we call as a pre hook in mongoose, like we can specify what to do if certain event is going to take place on the database.
//for excample, whenever data will be saved, it will first encrypt the password and then save
userSchema.pre("save", async function(next){

    if(!this.modified("password")) return next()

    this.password=bcrypt.hash(this.password, 10)
    
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password)
}

//by using methods and followed by name we can create some methods too, 
//remember the protype thing in js ? exactly the same, we are introducing more methods, 
//so that we can directly use them wherever wanted
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id: this._id 
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
 )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id: this._id 
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
 )
}
export const User=mongoose.model("User",userSchema)