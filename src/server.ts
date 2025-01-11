import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from "cors";
import router from "./router";

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

const corsOptions = {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}

app.use(cors(corsOptions));
// app.use(express.static("public"));
app.use(express.json());
app.use("/api/v2/router", router);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});