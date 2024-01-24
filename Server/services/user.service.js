import User from "../models/user.model.js";
import { ValidationError, MongoServerError } from 'mongoose';



export const createUser = async(user) => {
    try {
        const newUser = new User(user.body);
        try {
            await newUser.save();
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw Promise.reject(new ValidationError("User creation failed due to validation: " + error.message));
            } else if(error.name === "MongoServerError") {
                throw Promise.reject(new MongoServerError(error.message));
            }
            return Promise.reject(new Error("User creation failed with error "+error.message));
        }
        return newUser;
    } catch (error) {
        return Promise.reject(new Error(error.message));
    }
}

export const getUser = async(username) => {
    try {
        const user = await User.findOne({username : username});
        return user;
    } catch (error) {
        return Promise.reject(new Error("getUser failed while fetching user with username "+username));
    }
}
