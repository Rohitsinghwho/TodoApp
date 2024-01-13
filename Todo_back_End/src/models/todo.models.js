import mongoose,{Schema} from "mongoose";
import { User } from "./users.models.js";
const TodoSchema= new Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:50
        },
        description:{
            type: String,
            default:""
        },
        createdBy:{
            type:mongoose.Types.ObjectId,  //reference to User model
            ref:'User'
        }
    },
    {
        timestamps:true
    }
    )

    TodoSchema.post('save', async function (doc, next) {
    try {
        const user = await User.findByIdAndUpdate(
          doc.createdBy,
          { $addToSet: { AllNotes: doc._id } },
          { new: true }
        );
        next();
      } catch (error) {
        console.error(error);
        next(error);
      }
 });

 TodoSchema.post('remove', async function (doc, next) {
    try {
        const user = await User.findByIdAndUpdate(
            doc.createdBy,
            { $pull: { AllNotes: doc._id } },
            { new: true }
          );
          next();
        
    } catch (error) {
        console.error(error);
        next(error);   
    }
 });
 
export const Todo= mongoose.model("Todo",TodoSchema);