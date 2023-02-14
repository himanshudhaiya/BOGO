const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  facebook_id: {
    type: String,
  },
  create_password: {
    type: String,
  },
  mobile_number: {
    type: String,
  },
  type_of_business: {
    type: String,
  },
  location: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  business_name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  country: {
    type: String,
  },
  category: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  hours_of_operation_from: {
    type: String,
  },
  hours_of_operation_to: {
    type: String,
  },
  rating: {
    type: String,
  },
  price_range: {
    type: String,
  },
  brand_logo: {
    type: String,
  },
  banner: {
    type: String,
  },
  menu: {
    type: String,
  },
  ambience: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
    
});

module.exports = mongoose.model("MerchantUser", schema);
