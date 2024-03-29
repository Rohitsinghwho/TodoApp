import {asyncHandler} from '../utils/AsyncHandler.js'
import {apiError} from '../utils/ApiError.js'
import { User } from '../models/users.models.js';
import {apiResponse} from '../utils/ApiResponse.js'
import { mongoose } from 'mongoose';

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
    const user=await User.findById(req.user._id)
    if(!user){
        throw new apiError(400,"User Does not Exist")
    }
    await user.deleteOne(user);
    return res.status(200).json(new apiResponse(200,{},"Account deleted Successfully"));
})

const UpdateDetails= asyncHandler(async(req,res)=>{
    //Todo Update user
    const {fullName,email,password}=req.body;
    if(!fullName&&!email&&!password){
        throw new apiError(400,"Either of the fields are required");
    }
    const OldUser=await User.findById(req.user._id)
    const user= await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                fullName:fullName?fullName:OldUser.fullName,
                email:email?email:OldUser.email,
                password:password?password:OldUser.password
            }
        },
        {
            new:true,
        })
    if(!user){
        throw new apiError(400,"Cannot Update User")
    }
    return res.status(200).json(new apiResponse(200,{},"Updated Details"))
})

const getUser= asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id).select("-password -refreshToken");
    if(!user){
        throw new apiError(404,"User not Found")
    }
    return res.status(200).json(new apiResponse(200,user,"User fetched Successfully"))

})

const fetchAllNotes = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    try {
      const userAggregate = await User.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.user._id)
          }
        },
        {
          $lookup: {
            from: 'todos', // Assuming your Note collection is named 'notes'
            localField: 'AllNotes',
            foreignField: '_id',
            as: 'AllNotes'
          }
        },
        {
          $unwind: '$AllNotes' // Unwind the array, if needed
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: parseInt(limit)
        },
        {
          $group: {
            _id: '$_id',
            AllNotes: { $push: '$AllNotes' },
            totalNotes: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            AllNotes: 1,
            totalNotes: 1
          }
        }
      ]);
  
      // If you want to return the result as an array, you can use the spread operator
      const [result] = userAggregate;
      return res.status(200).json(new apiResponse(200, result, 'Notes Fetched'));
    } catch (error) {
      console.error(error);
      throw new apiError(500, 'Internal Server Error');
    }
  });
  
export{
    registerUser,
    LoginUser,
    LogoutUser,
    deleteUser,
    UpdateDetails,
    getUser,
    fetchAllNotes
}