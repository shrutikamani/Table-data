import express from "express"; 
import mongoose from "mongoose"; 
import bodyParser from "body-parser"; 
import dotenv from "dotenv"; 
import cors from "cors"; 
import { error } from "node:console";
import route from './routes/userRoute.js'


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


app.use("/api" , route);


const PORT = process.env.PORT ||7000;
const URL = process.env.MONGOURL;


mongoose.connect(URL)   .then(() => {
    
console.log("DB connected SuccessFully");
app.listen(PORT , () => {

console.log(`server is running on port ${PORT}`);

});

}).catch((err) => {
    console.log(error);  
});



