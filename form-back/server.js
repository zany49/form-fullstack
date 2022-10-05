import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser'
import { readdirSync } from "fs";


const app = express();
dotenv.config();



const PORT = process.env.PORT ;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(()=>console.log('Connected to db'))
.catch((err)=> console.log("DB connection error",err));

//middleware
// app.use(bodyParser);
app.use(express.json()); //limiting the data size
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:3000",
}));

//autoload routes
readdirSync('./routes').map((r) => app.use('/form', require(`./routes/${r}`)));


app.listen(PORT,()=>console.log('connected to db',PORT))

