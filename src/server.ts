import express, {Response, Request, NextFunction} from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import crudRouter from "./routers/curd";
import authRouter from "./routers/auth";


const app = express();
const PORT = 3000;
const DBPath = "mongodb://localhost:27017/database";

mongoose
    .connect(DBPath, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB:", e);
    });

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: DBPath,
            collectionName: "sessions",
        }),
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(express.static("public"));
app.use(express.json());

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        res.status(400).json({error: "forbidden"});
        return;
    }

    next();
};

app.use("/api/v1/items", isAuthenticated);
app.use("/api/v1/items", crudRouter);
app.use("/api/v1/", authRouter);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});