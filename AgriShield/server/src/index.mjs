import express from "express";
import mongoose from "mongoose"; 
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import AllRoutes from "./routes/route.mjs"; 
import "./strategies/local-strategy.mjs";

const app = express();

mongoose.connect("mongodb://localhost/AgriSheild")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Error found while connecting to database", err);
  });

// Middleware to set the ngrok-skip-browser-warning header
app.use((req, res, next) => {
  // Set the 'ngrok-skip-browser-warning' header for all incoming requests
  req.headers['ngrok-skip-browser-warning'] = 'skip-browser-warning';
  next();
});

// CORS configuration
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://4bbe-2401-4900-5fce-7b66-6376-e849-5c40-83dd.ngrok-free.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cookieParser("void"));
app.use(
  session({
    secret: "void",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(AllRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
