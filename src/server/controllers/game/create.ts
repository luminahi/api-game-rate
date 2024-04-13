import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const create: Handler = async (req, res) => {
    const { name } = req.body;
    const game = await gameService.create(name);
    return res.status(201).json({ game });
};

export { create };
