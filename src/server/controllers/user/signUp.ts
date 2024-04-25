import { Handler } from "express";
import { userService } from "../../database/services/user/index.js";

const signUp: Handler = async (req, res) => {
    const savedUser = await userService.create(req.body);
    if (!savedUser)
        return res.status(400).json({ error: "user could not be registered" });
    return res.status(201).json({ msg: "user registered" });
};

export { signUp };
