const mongoose = require("mongoose");
require('dotenv').config();
const conn = async() =>{
    try{
        
        const response = await mongoose.connect('mongodb+srv://ssn367480:7BB5e9e@cluster0.kz6b1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        if (response){
            console.log("connected to DB")
        }
    }
    catch(error){
        console.log(error)
    }
}
conn()