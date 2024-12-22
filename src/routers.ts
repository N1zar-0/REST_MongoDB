import express, {Response, Request} from "express";
import fs from "fs";

interface Item {
    id: number;
    text: string;
    checked: boolean;
}

const dataFilePath = "./data.json";

const readData = (): { items: Item[] } => {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
};

const writeData = (data: { items: Item[] }) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};


const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const data = readData();
    res.json(data);
});


router.post("/", (req: Request, res: Response) => {
    let text = req.body.text;

    if (!text) {
        res.status(400).json({error: "Text is required"});
        return;
    }

    const data = readData();
    const id = Math.max(0, ...data.items.map(item => item.id)) + 1;
    const newItem = {id, text, checked: false};

    data.items.push(newItem);
    writeData(data);

    res.status(201).json({id});
});


router.put("/", (req: Request, res: Response) => {
    let {id, text, checked} = req.body;

    if (id === undefined || text === undefined || checked === undefined) {
        res.status(400).json({error: "Invalid request body"});
        return;
    }

    const data = readData();
    let idx = data.items.findIndex(item => item.id === id);

    const newItem = {id, text, checked};
    if (idx === -1)
        data.items.push(newItem);
    else
        data.items[idx] = newItem;

    writeData(data);
    res.status(200).json({ok: true});
});


router.delete("/", (req: Request, res: Response) => {
    let id = req.body.id;

    if (id === undefined) {
        res.status(400).json({error: "ID is required"});
        return;
    }

    const data = readData();
    const newData = data.items.filter(item => item.id !== id);

    if (newData.length === data.items.length) {
        res.status(404).json({error: "Item not found"});
        return;
    }

    writeData({items: newData});
    res.status(200).send({ok: true});
});

export default router;