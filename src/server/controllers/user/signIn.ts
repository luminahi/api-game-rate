import { Handler } from "express";

const signIn: Handler = (req, res) => {
    console.log(req.body);
    res.status(200).json({ dataSent: req.body });
};

export { signIn };
