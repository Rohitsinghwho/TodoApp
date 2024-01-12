import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const UserSchema= new Schema(
    {
        username:{
            type:String,
            required:[true,"Username is required"],
            unique:true,
            lowercase:true,
            index:true,
        },
        FullName:{
            type:String,
            maxLength:50
        },
        email:{
            type:String,
        },
        password:{
            type: String,
            required:[true,"Password is Required"],
            maxLength:8
        },
        refreshToken:{
            type:String,
        }

    },
    {
        timestamps:true
    }
    )
UserSchema.pre('save', async function(next){
    if(!this.isModified("password"))return next();
    this.password= await bcrypt.hash(this.password,10);
})
UserSchema.methods.isPasswordCorrect= async function(password){
    return await  bcrypt.compare(password,this.password)
}
UserSchema.methods.genrateRefreshToken= function(){
    return jwt.sign(
        {
        _id:this._id,
        },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
    ) 
}
UserSchema.methods.genrateAccessToken=async function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
        },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
    )
}
export const User= mongoose.model("User",UserSchema);