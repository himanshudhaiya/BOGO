const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    merchant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MerchantUser",
    },
    offer_type:{
        type: String,
    },
    being_offer:{
        type: String,
    },
    estimated_saving:{
        type: String,
    },
    branches:[{
        type: String
    }],
    dubai_marina:{
        type: String,
    },
    day_of_the_week:{
        type: String,
    },
    weekends :{
        type: String,
    },
    public_holiday:{
        type: String,
    },
    customize_timing:{
        type: String,
    },
    fine_print:{
        type: String,
    },
    maximum_redemptions:{
        type: String,
    },
    should_the_buy:{
        type: String,
    },
    will_the_get:{
        type: String,
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Campaign", Schema)