import mongoose from "mongoose";

const dbConfig = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('database connected successfully');
        })
    } catch (error) {
        console.log(error);
    }
}

export default dbConfig