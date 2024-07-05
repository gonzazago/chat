import mongoose from "mongoose";

const connectDB = async()=>{

    try{
        await mongoose.connect('mongodb+srv://gonza_zago:P1RKQ3AXHnn8dppU@cluster0.wq3pepn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected');

    }catch(error){
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}

export default connectDB;