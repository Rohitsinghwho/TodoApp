import {asyncHandler} from '../utils/AsyncHandler.js'
import {apiError} from '../utils/ApiError.js'
import { User } from '../models/users.models.js';
import {apiResponse} from '../utils/ApiResponse.js'


const genrateAccessandRefreshToken=async(userId)=>{
   try {
    const user= await User.findById(userId)
     const refreshToken=  user.genrateRefreshToken();
     const accessToken=   user.genrateAccessToken();
     //save in db
     user.refreshToken=refreshToken;
     await user.save({ValidateBeforeSave:false})
     return {refreshToken,accessToken}
 
   } catch (error) {
     throw new apiError(501,"failed to genrate Tokens")
   }
}
const registerUser= asyncHandler(async(req,res)=>{
    //Todo register user
    const {username,email,password,fullName}=req.body;
    if(!username){
        throw new apiError(400,"Username is Required")
    }
    if(!password){
        throw new apiError(400,"Password is required");
    }
    const isRegistered= await User.findOne({username:username});
    if(isRegistered){
        throw new apiError(400,"User With this Username is already Registered")
    }

    const user= await User.create({
        username:username.toLowerCase(),
        email,
        password,
        fullName,
    })
    if(!user){
        throw new apiError(500,"Internal Server Error cannot Create User");
    }
    const CreatedUser= await User.findById(user._id).select("-password -refreshToken")
    return res.status(200).json(new apiResponse(200,CreatedUser,"User Registered Successfully"));
})

const LoginUser= asyncHandler(async(req,res)=>{
    //Todo Login user
    const {username,password}=req.body;
    if(!username || !password){
        throw new apiError(400,"Username or Password is required");
    }
    const user=await User.findOne({username:username});
    if(!user){
        throw new apiError(400,"User does not Exist")
    }
    const isPassword= await user.isPasswordCorrect(password);
    if(!isPassword){
        throw new apiError(400,"Incorrect Password")
    } 
    const {refreshToken,accessToken}= await genrateAccessandRefreshToken(user._id);
    // console.log("refreshToken: ",refreshToken)
    // console.log(accessToken)
    const options = {
        httpOnly: true,
        secure: true,
    };
    const LoggedInUser= await User.findById(user._id).select("-password -refreshToken")
    if(!LoggedInUser){
        throw new apiError(400,"LoggedIn User does not exist")
    }
    return res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(new apiResponse(
        200,{user:LoggedInUser,accessToken,refreshToken},"User LoggedIn Successfully"
    ))
})

const LogoutUser= asyncHandler(async(req,res)=>{
    //Todo Logout user

    const createdUser=  await User.findByIdAndUpdate(req.user?._id,
        {
            $unset:{
                refreshToken:true
            }
        },
        {
            new:true,
        }
        );
    if(!createdUser)
    {
        throw new apiError(404,"User Not found during Logout")
    }
    const options = {
        httpOnly: true,
        secure: true,
      };
    return res.status(200).clearCookie("refreshToken",options ).clearCookie("accessToken",options).json(new apiResponse(
        200,{},"Logged Out Successfully"
    ));

})

const deleteUser=asyncHandler(async(req,res)=>{
    // Todo delete User
})

const UpdateDetails= asyncHandler(async(req,res)=>{
    //Todo Update user
})

const fetchAllNotes= asyncHandler(async(req,res)=>{
    //Todo Fetch all notes and size of total notes of user
})


export{
    registerUser,
    LoginUser,
    LogoutUser,
    deleteUser,
    UpdateDetails,
    fetchAllNotes
}