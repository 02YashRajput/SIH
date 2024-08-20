import express from "express";
import mongoose from "mongoose"; 
import MongoStore from "connect-mongo"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express();

mongoose
.connect("mongodb://localhost/AgriSheild")
.then(()=>{
  console.log("connected to database");
})
.catch((err)=>{
  console.log("Error found while conecting to database",err);
});


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(express.json());
app.use(cookieParser("void"));
app.use(
  session({
    secret:"void",
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:60000*60*24*30,
    },
    store:MongoStore.create({
      client:mongoose.connection.getClient(),
    })
  })
)
app.listen(5000,()=>{
  console.log("server is running on port 5000");
})