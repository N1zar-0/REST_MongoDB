import {Router, Response, Request} from "express";
import ItemModel from "../models/Item";

const crudRouter = Router();

crudRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items = await ItemModel.find();
        res.status(200).json({items : items});
    } catch (e) {
        res.status(500).json({error: "Failed to fetch items"});
    }
});


crudRouter.post("/", async (req: Request, res: Response) => {
    let text = req.body.text;

    if (!text) {
        res.status(400).json({error: "Text is required"});
        return;
    }

    try {
        const newItem = new ItemModel({text});
        await newItem.save();

        res.status(201).json({id: newItem._id});
    } catch (e) {
        res.status(500).json({error: "Failed to add item"});
    }
});


crudRouter.put("/", async (req: Request, res: Response) => {
    let {id, text, checked} = req.body;

    if (id === undefined || text === undefined || checked === undefined) {
        res.status(400).json({error: "Invalid request body"});
        return;
    }

    try {
        const updatedItem = await ItemModel.findByIdAndUpdate(id, {text, checked});

        if (!updatedItem) {
            res.status(404).json({error: "Item not found"});
            return;
        }

        res.status(200).json({ok: true});
    } catch (e) {
        res.status(500).json({error: "Failed to update item"});
    }
});


crudRouter.delete("/", async (req: Request, res: Response) => {
    let id = req.body.id;

    if (id === undefined) {
        res.status(400).json({error: "ID is required"});
        return;
    }

   try {
       const deletedItem = await ItemModel.findByIdAndDelete(id);
       if (!deletedItem) {
           res.status(404).json({ error: "Item not found" });
           return;
       }

       res.status(200).send({ok: true});
   }catch (e) {
       res.status(500).json({ error: "Failed to delete item" });
   }
});

export default crudRouter;