
import mongoose from "mongoose"
import "dotenv/config"

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDb connection error:", error)
        process.exit(1)
    }
}

export default connectDB