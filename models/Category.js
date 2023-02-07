const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    max: 50,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default: Date.now,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", schema);
