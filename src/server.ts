import express, { Response, Request } from "express";
import router from "./routers";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

// app.get("/", (req : Request, res: Response) => {
//     console.log(req.url);
//     res.send("<h1>HELLO!</h1>");
// });

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});