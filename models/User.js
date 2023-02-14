const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password : {
    type: String,
  },
  roll:{
    type : String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  type_of_business:{
    type: String,
  },
  location : {
    type: String,
  },
  approved:{
    type: Boolean,
    default: false,
  },
  store : [{
    business_name : {
      type: String,
    },
    address:{
      type: String,
    },
    city:{
      type: String,
    },
    postal_code:{
      type: String,
    },
    country:{
      type : String,
    },
    category:{
      type: String,
    },
    tags:[{
      type: String,
    }],
    hours_of_operation_from:{
      type: String,
    },
    hours_of_operation_to:{
      type: String,
    },
    rating:{
      type: String,
    },
    price_range:{
      type: String,
    }
  }],
  gallery : [{
    brand_logo : {
      type: String,
    },
    banner:{
      type: String,
    },
  }],
  menu : {
    type: String,
  },
  ambience:{
    type: String,
  }
});

module.exports = mongoose.model("User", schema);