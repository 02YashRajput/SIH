import mongoose, {Schema} from "mongoose";



const cropsSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  }

})
export const Crops = mongoose.model("Crops",cropsSchema);
