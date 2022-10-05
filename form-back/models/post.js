import  mongoose  from "mongoose";

const { ObjectId } = mongoose.Schema;


const postSchema = new mongoose.Schema({
 
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    middleName: {
        type: String
    },
    email: {
        type: String,
        required:true,
    },
    phone: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required:true,
    },
    country: {
        type: String,
        required:true,
    },
    state: {
        type: String,
        required:true,
    },
    zip: {
        type: String,
        required:true,
    },
    height: {
        type: String,
        required:true,
    },
    weight: {
        type: String,
        required:true,
    },

},
{
    collection:'formData',
    timestamps:true
}
)


export default mongoose.model("Post", postSchema)