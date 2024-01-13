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
            trim:true,
            index:true,
        },
        fullName:{
            type:String,
            required:[true,"full name is required"],
            trim:true,
            default:""
        },
        email:{
            type:String,
            required:[true,"email is required"],
            trim:true,
            default:""
        },
        password:{
            type: String,
            required:[true,"Password is Required"],
            minLength:[8,"Please Enter a password greater than 8"]
        },
        AllNotes:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo"
            }
        ],
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
    next();
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
UserSchema.methods.genrateAccessToken=function(){
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