import express from 'express';
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json())

const PORT=5000;
import documentRoute from './routes/documentRoute';


app.use("/api/v1/document",documentRoute )

app.listen(PORT,()=>{
    console.log("Server is running...")
})