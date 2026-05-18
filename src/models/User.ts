import { model } from "mongoose";
const mongoose = require('mongoose');


export enum UserRole {
    admin = "admin",
    user = "user",
    editor = "editor"

}
export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}


const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    role: {
        type: String,
        enum: ['admin', 'editor', 'user'],
        default: 'user'
    },
    password: { type: String, require: true },

},
    {
        timestamps: true
    })
export default model('User', UserSchema);