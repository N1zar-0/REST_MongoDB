import {Router, Request, Response} from "express";
import {getItems, createItem, editItem, deleteItem} from "./handlers/curd"
import {login, logout, register} from "./handlers/auth";

const router = Router();

router.all("/", (req: Request, res: Response) => {
    const {action} = req.query;

    if (!(req.session.userId || action === "login" || action === "register")) {
        res.status(400).json({error: "forbidden"});
        return;
    }

    switch (action) {
        case "login":
            login(req, res);
            return;
        case "logout":
            logout(req, res);
            return;
        case "register":
            register(req, res);
            return;
        case "getItems":
            getItems(req, res);
            return;
        case "createItem":
            createItem(req, res);
            return;
        case "editItem":
            editItem(req, res);
            return;
        case "deleteItem":
            deleteItem(req, res);
            return;
        default:
            res.status(400).json({error: "Invalid action"});
            return;
    }
});

export default router;