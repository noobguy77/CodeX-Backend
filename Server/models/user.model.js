// MONGOOSE SCHEMA
import { Schema, model } from "mongoose";

var userSchema = new Schema({

    //basic details
    username: { // primary key
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "this is a mandatory attribute"],
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        index: true,
    },
    name : {
        type : String,
        required : true,
    },
    branch : String,
    password: {
        type : String,
        required : true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "this is a mandatory attribute"]
    },
    phone: {
        type: Number,
        default: 0
    },

    //batch details
    batchId : {
        type : String,
        lowercase : true,
        required : true
    },
    batchYear : {
        type : Number,
        required : true,
        default : 2020
    },
    institutionId : {
        type : String,
        required : true
    },

    // Custom user attributes
    attributes: {
        type: Map,
        of: Schema.Types.Mixed, // Can store various data types like string, number, date etc.
    },
    multiValuedAttributes: {
        type: Map,
        of: Schema.Types.Array, // An array of values for each attribute
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
}, {
    timestamps: true
});

export default model("User", userSchema);