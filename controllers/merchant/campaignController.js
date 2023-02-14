const Campaign = require("../../models/Campaign");
const MerchantUser = require("../../models/MerchantUser");
const jwt = require("jsonwebtoken");

class CampaignController {
    static add = async (req, res) => {
        try {
            let token = req.body.token;
            if(!token) return res.redirect({
                message: "Token not found",
                status: 401,
                success: false,
            })

            const payload = jwt.decode(token, process.env.TOKEN_SECRET);
            const user = await MerchantUser.find(payload.id);
            if(!user) return res.send({
                message : "User not found",
                status: 401,
                success: false, 
            })

            let data = req.body
            let offer_type = data.offer_type;
            let being_offer = data.being_offer;
            let estimated_saving = data.estimated_saving;
            let branches = data.branches;
            let dubai_marina = data.dubai_marina
            let day_of_the_week = data.day_of_the_week
            let weekends = data.weekends
            let public_holiday = data.public_holiday
            let customize_timing = data.customize_timing
            let fine_print = data.fine_print
            let maximum_redemptions = data.maximum_redemptions

            if(offer_type == ""){
                return res.send({
                    message : "Please enter offer type",
                    status: 401,
                    success: false, 
                })
            } else if(being_offer == ""){
                return res.send({
                    message : "Please enter being offer",
                    status: 401,
                    success: false, 
                })
            } else if(estimated_saving == ""){
                return res.send({
                    message : "Please enter estimated saving",
                    status: 401,
                    success: false,
                })
            } else if(branches == ""){
                return res.send({
                    message : "Please enter branches",
                    status: 401,
                    success: false,
                })
            }  else if(day_of_the_week == ""){
                return res.send({
                    message : "Please enter day of the week",
                    status: 401,
                    success: false,
                })
            } else if(public_holiday == ""){
                return res.send({
                    message : "Please enter public holiday",
                    status: 401,
                    success: false,
                })
             } else if(weekends == ""){
                return res.send({
                    message : "Please enter weekends",
                    status: 401,
                    success: false,
                })
            } else if(customize_timing == ""){
                return res.send({
                    message : "Please enter customize timing",
                    status: 401,
                    success: false,
                })
            } else if(fine_print == ""){
                return res.send({
                    message : "Please enter fine print",
                    status: 401,
                    success: false,
                })
            } else if(maximum_redemptions == ""){
                return res.send({
                    message : "Please enter maximum redemptions",
                    status: 401,
                    success: false,
                })
            }
            const campaign = new Campaign({
                merchant_id : user._id,
                offer_type : offer_type,
                being_offer : being_offer,
                estimated_saving : estimated_saving,
                branches : branches,
                dubai_marina : dubai_marina,
                day_of_the_week: day_of_the_week,
                weekends : weekends,
                public_holiday : public_holiday,
                customize_timing : customize_timing,
                fine_print : fine_print,
                maximum_redemptions :maximum_redemptions,
                should_the_buy : req.body.should_the_buy,
                will_the_get : req.body.will_the_get,
            });
            await campaign.save()

            return res.status(200).json({
                message : "BuyOne GetOne add successfull",
                status : 200,
                success : true,
                data : campaign
            })


        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Something went wrong", error: true });
        }
    }
}
module.exports = CampaignController;