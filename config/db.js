const mongoose = require("mongoose");
const connectDB = async()=> {
    try{
        const con = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        console.log(`MongoDB Connected: ${con.connection.host}`)
    }
    catch(error){
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}
module.exports = connectDB