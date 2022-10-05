import mongoose from 'mongoose';

const {Schema} = mongoose;


//no sql to collect data from frontend
const userSchema = new Schema({
  
    password:
    { 
        type: String,
         required: true,
         min:6,
         max:64,
    },  
    username:{
        type: String,
        unique: true,
        required: true,
    }
},
//passing as second argument
{ 
    collection:'formUser',
    timestamps:true,
}
);
export default mongoose.model('User', userSchema);