import express, {Response, Request} from "express";
import mongoose from "mongoose";
// import session from "express-session";
// import FileStore from "session-file-store";
import crudRouter from "../routers/curd";

const app = express();
const PORT = 3000;

mongoose
    .connect("mongodb://localhost:27017/database", {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB:", e);
    });

// const FileStoreSession = FileStore(session);

// app.use(
//     session({
//         store: new FileStoreSession({
//             path: "./../sessions",
//             ttl: 3600,
//         }),
//         secret: "secret-key",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             secure: false,
//             httpOnly: true,
//         },
//     })
// );

app.use(express.static("public"));
app.use(express.json());

app.use("/api/v1/items", crudRouter);

// app.get("/", (req : Request, res: Response) => {
//     console.log(req.url);
//     res.send("<h1>HELLO!</h1>");
// });

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});