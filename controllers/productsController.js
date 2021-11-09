import Menu from "../models/menu";


export const productsController ={
    async getMenu(req, res){
        let document;
        try{
            document = await Menu.find().sort({_id: -1});
        }
        catch(err){
            console.log(err);
            return res.status(500).send("something went wrong");
        }

        return res.json(document);
    }
}