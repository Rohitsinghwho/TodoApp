import {asyncHandler} from '../utils/AsyncHandler.js'






const AddNotes= asyncHandler(async(req,res)=>{
    //Todo Add Notes
})


const UpdateNotes= asyncHandler(async(req,res)=>{
    //Todo Update Notes
})

const DeleteNotes= asyncHandler(async(req,res)=>{
    //Todo Delete Notes
})

const getNotebyId= asyncHandler(async(req,res)=>{
    //Todo getNotebyid 
})



export {
    AddNotes,
    UpdateNotes,
    DeleteNotes,
    getNotebyId
}