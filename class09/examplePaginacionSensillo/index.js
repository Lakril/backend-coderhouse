import mongoose, { mongo } from "mongoose";
// import users from "./users.json" with {type: 'json'};
import {User} from "./models/User.js";

await mongoose.connect('mongodb://localhost:27017/coderhouse');

// console.log(await User.deleteMany({}));
// console.log(await User.insertMany(users));
// console.log(await User.countDocuments());
// console.log(await User.syncIndexes());


// const response = await User.find().explain("executionStats");
// // console.log(response);
// console.log(response['executionStats']['executionTimeMillis'])
// console.log(response['queryPlanner']['winningPlan']['queryPlan'])


const response1 = await User.find({first_name: 'Ethelind'}).explain("executionStats");
console.log(response1['executionStats']['executionTimeMillis'])
console.log(response1['queryPlanner']['winningPlan'])





// const reponse = User.find().explain("executionStats");
// console.log(reponse);
// console.log(response.executionStats.executionTimeMillis)
// console.log(response['queryPlanner']['winningPlan']['inputStage']['inputStage']['executionStats']['executionTimeMillis'])



mongoose.connection.close();