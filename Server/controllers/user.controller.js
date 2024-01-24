import User from "../models/user.model.js";
import { createUser, getUser  } from "../services/user.service.js"
import { isNullOrEmpty } from "../util/utilities.js"
import { sendResponse } from "../services/responseUtil.js"


// Create and Save a new user
export const create = async (req, res) => {
  // if(isNullOrEmpty(req.body.username) || !isNullOrEmpty(getUser(req.body.username))) {
  //   return sendResponse(res,false,null,"User already exists with username or Username is invalid",400);
  // }
  // let newUser = await createUser(req);
  // return sendResponse(res, true, newUser, "User Signed up successfully with username "+req.body.username, 201);
  try {
    if(isNullOrEmpty(req.body.username) || !isNullOrEmpty(getUser(req.body.username))) {
      return sendResponse(res,false,null,"User already exists with username or Username is invalid",400);
    }
    let newUser = await createUser(req);
    return sendResponse(res, true, newUser,  "User Signed up successfully with username "+req.body.username, 201);

  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendResponse(res, false, null, "User Creation failed due to validation: " + error.message, 400);
    } else if(error.name === "MongoServerError") {
      return sendResponse(res, false, null, "User Creation failed due to Duplicate: " + error.message, 400);
    }
    return sendResponse(res, false, null, "User Creation failed due to "+error.message, 400);
  }

};

// Retrieve and return all users from the database.
export const findAll = async (req, res) => {
  try {
    const users = await User.find({});
    return responseUtil.sendResponse(res,true,users,"Users fetched successfully",200);
  } catch(error) {
    return responseUtil.sendResponse(res,false,null,"error occurred while retrieving users" + error.message,400);
  }
};

// Find a single user with a username
export const findOne = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    return responseUtil.sendResponse(res,true,user,"User fetched successfully",200);
  } catch(error) {
    return responseUtil.sendResponse(res,false,null,"error occurred while retrieving user" + error.message,400);
  }
};

// Update a user identified by the username in the request
export const update = (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(400).send({
      success: false,
      message: "User content can not be empty",
    });
  }

  // Find user and update it with the request body
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
    }
  )
    .then((user) => {
      if (!user) {
        return responseUtil.sendResponse(res,false,null,"User not found with username  " + req.params.username,404);
      }
      return responseUtil.sendResponse(res,true,user,"User found with username  " + req.params.username,200);
    })
    .catch((err) => {
      return responseUtil.sendResponse(res,false,null,"User not found with username  " + req.params.username+" due to"+err.message,404);
    });
};