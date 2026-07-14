import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import certificateRoutes from "./routes/certificateRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import { connectDB } from "./config/db.js";


dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/certificates",
    certificateRoutes
);


app.get("/", (req,res)=>{
    res.json({
        message:"CertiChain Backend Running 🚀"
    });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});