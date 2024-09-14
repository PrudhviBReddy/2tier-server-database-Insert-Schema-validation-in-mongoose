const mongoose = require("mongoose");
const { type } = require("os");


let studentSchema = new mongoose.Schema({
       firstName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Za-z\s]{2,20}$/.test(v);
          },
          message: props => `${props.value} is not a valid first Name!`
        },
        required: [true, 'User first Name required'],
      },
      lastName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Za-z\s]{2,20}$/.test(v);
          },
          message: props => `${props.value} is not a valid last Name!`
        },
        required: [true, 'User last Name required'],
      },
    age:{
        type:Number,
        min:[18,"You are too young to create account."],
        max:[120,"You are too old to create account."],
        required: true,
    },
    gender:{
        type: String,
        required: true,
        lowercase: true,
        enum:["male", "female"],
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email id!`
        },
        required: [true, 'User email id required'],
      },
    phoneNumber:String,
});

let Student = new mongoose.model("students", studentSchema);



let saveToDB = async ()=>{

    try{
        let prudhvi = new Student({
            firstName:"Prudhvi",
            lastName:"Reddy",
            age:28,
            gender:"male",
            email:"prudhvi@gmail.com",
            phoneNumber:"+91-9876543210",
            maritalStatus:"Single",
        });
        
       //await prudhvi.save();

       let ram = new Student({
        firstName:"Ram",
        lastName:"Reddy",
        age:50,
        gender:"male",
        email:"ram@gmail.com",
        phoneNumber:"+91-9012345678",
       });

       let raj = new Student({
        firstName:"Raj",
        lastName:"Reddy",
        age:25,
        gender:"male",
        email:"raj@gmail.com",
        phoneNumber:"+91-9988776655",
        maritalStatus:"Married",
       });

       //await raj.save();
       Student.insertMany([prudhvi, raj, ram]);
       console.log("Saved to MDB successfully");
    }catch(err){
        console.log("Unable to Save");
    }
    
};

let getDataFromDB = async ()=>{

    let studentsData = await Student.find();
    console.log(studentsData);
}

let connectToMDB = async ()=>{

    try{
        await mongoose.connect("mongodb+srv://prudhvireddy:prudhvireddy@prudhvib.jwu4g.mongodb.net/Batch2405Students?retryWrites=true&w=majority&appName=PrudhviB");
        console.log("Successfully connected to MDB");
        //saveToDB();
        getDataFromDB();
    }catch(err){
        console.log("Unable to connect to MDB");
        console.log(err);
    }
};

connectToMDB();


