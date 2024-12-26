// import express, {Response, Request} from "express";
//     // import bcrypt from "bcrypt";
//     import fs from "fs";
//
// const router = express.Router();
//
// router.post("/login", (req: Request, res: Response) => {
//     const {login, pass} = req.body;
//
//     req.session.user = {"sdf0": false};
//
//     res.status(200).send({ok : true});
// })
//
// router.post("/logout", (req: Request, res: Response) => {
//
//     res.status(200).send({ok : true});
// });
//
// router.post("/register ", (req: Request, res: Response) => {
//     const {login, pass} = req.body;
//
//     res.status(201).send({ok : true});
// })