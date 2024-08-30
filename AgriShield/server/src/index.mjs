import express from "express";
import mongoose from "mongoose"; 
import MongoStore from "connect-mongo"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors";
import passport from  "passport";
import AllRoutes from "./routes/route.mjs"; 
import "./strategies/local-strategy.mjs";
import { MarketPlace } from "./mongoose/market-place.mjs";


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

app.use(passport.initialize());
app.use(passport.session());

app.use(AllRoutes)



// const insertFunction = async()=>{


//   for (const contractData of mockContracts) {
//     try {
//       const newContract = new MarketPlace(contractData);
//       await newContract.save();
//     } catch (error) {
//       console.error("Error inserting mock contract:", error);
//     }
//   }

// }
// insertFunction();




app.listen(5000,()=>{
  console.log("server is running on port 5000");
})