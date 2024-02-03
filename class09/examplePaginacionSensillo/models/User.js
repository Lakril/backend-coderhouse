import {randomUUID} from 'crypto';
import {Schema, model} from 'mongoose';


const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    first_name: {type:String, index: true }, 
    last_name: String,
    email: String,
    gender: String,
},
{
    strict: 'throw',
    versionKey: false,

});

export const User = model('User', userSchema);