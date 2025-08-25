import mongoose from "mongoose"
const ConnectDB = async ()=>{
    await mongoose.connect('mongodb+srv://zahid:zahid634@cluster0.d8woraq.mongodb.net/todo-app')
    console.log('DB Connected');
    
}

export default ConnectDB;