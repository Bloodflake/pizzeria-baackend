import CustomErrorHandler from "../services/CustomErrorHandler";
import {DEBUG_MODE} from "../config";
import {Order} from "../models"

const orderController = {
    async order(req, res, next){
        
        //console.log(req.body)
        try{
            const order = new Order({
                user_id: req.user._id,
                total_amount: req.body.total,
                items: []
            })

            // const result = await order.save();
            //console.log("order", result);
            let items = []
            for(const [key, value] of Object.entries(req.body.cart.items)){
                const orderItem = {
                    product_id: key,
                    quantity: value
                }
                
                items.push(orderItem)
            }

            order.items = items;

            const result = await order.save();
            return res.send("order recived")
        }
        catch(err){
            console.log(err)
            next(err);
        }
    },
    async adminOrder(req, res, next){
        try{

            // const orders = await Order.find().populate({path:"user_id", select: "name"});
            // console.log("orders  ",orders);
            const orderItems = await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate({path: "user_id", select: "name"}).populate({path: "items", populate:{path: "product_id", select: ["name", "size"]}});
            // console.log(orderItems)
            return res.json(orderItems)
        }
        catch(err){
            console.log(err);
            next(err)
        }
    },
    async updateStatus(req, res, next){
        try{
            await Order.findByIdAndUpdate(req.body.orderid, {status: req.body.status});
            return res.send("order status updated")
        }catch(err){
            console.log(err)
            next(err)
        }
    },
    async myOrders(req, res, next){
        try{
            const result = await Order.find({user_id: req.user._id}, null, { sort: { 'createdAt': -1 }});
            //console.log(result);
            return res.json(result);
        }catch(err){
            console.log(err);
            next(err);
        }
    },
    async getOrder(req, res, next){
        //console.log(req)
        try{
            const result = await Order.find({_id: req.query.id}).populate({path: "items", populate:{path: "product_id"}});
            //console.log(result);
            return res.json(result);
        }
        catch(err){
            console.log(err);
            next(err);
        }
    }
}

export default orderController;