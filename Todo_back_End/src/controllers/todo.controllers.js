import {asyncHandler} from '../utils/AsyncHandler.js'
import {apiError} from '../utils/ApiError.js'
import {apiResponse} from '../utils/ApiResponse.js'
import {Todo} from '../models/todo.models.js'
import {User} from '../models/users.models.js'



const AddNotes= asyncHandler(async(req,res)=>{
    //Todo Add Notes
    const {title,description}=req.body;
    if(!title&&!description){
        throw new apiError(400,"Title and description are required")
    }
    if(!title){
        throw new apiError(400,"Title is required")
    }
    const note= await Todo.create({
        title,
        description:description?description:"",
        createdBy:req.user._id
    });
    if(!note){
        throw new apiError(500,"Internal Server Error cannot create Note");
    }
    return res.status(200).json(new apiResponse(200,note,"Note Created"));
    
})


const UpdateNotes= asyncHandler(async(req,res)=>{
    //Todo Update Notes
    const {noteId}=req.params
    const {title,description}=req.body;
    if(!title&&!description){
        throw new apiError(400,"Title and description are required")
    }
    const Oldnote=await Todo.findById(noteId);
    const note= await Todo.findByIdAndUpdate(noteId,
        { 
        
            $set:{
                 title:title?title:Oldnote.title,
                description:description?description:Oldnote.description,
        }
    },{new:true});
    if(!note){
        throw new apiError(500,"Internal Server Error cannot create Note");
    }
    // const user= await User.findById(req.user._id);
    // user.AllNotes.push(note)
    // user.save({validateBeforeSave:false})
    return res.status(200).json(new apiResponse(200,note,"Note Updated"));
    
})

const DeleteNotes= asyncHandler(async(req,res)=>{
    //Todo Delete Notes
    const {noteId}=req.params
    const note=await Todo.findById(noteId)
     if(!note){
        throw new apiError(404,"Note not found")
     }
    await Todo.deleteOne(note)
    return res.status(200).json(new apiResponse(200,{},"Note Deleted"));
    
})

const getNotebyId= asyncHandler(async(req,res)=>{
    //Todo getNotebyid 
    const {noteId}= req.params
    const note = await Todo.findById(noteId)
    if (!note) {
        throw new apiError(404, "Note Not Found!");
    }
    return res.status(200).json(new apiResponse(200,note,"Successfully got the Note by Id!"))
})



export {
    AddNotes,
    UpdateNotes,
    DeleteNotes,
    getNotebyId
}