import  express  from "express";

import  formidable from "express-formidable";
//middleware
import {requireSignin} from "../middleware/auth";
import {addUser,getUser,deleteUser
} from "../controllers/post"

const router = express.Router();

router.post('/save-details',requireSignin,addUser);
router.get('/getUser',requireSignin,getUser)
router.delete('/delete-details/:_id',requireSignin,deleteUser);


module.exports= router;