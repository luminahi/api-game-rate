import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const getAll: Handler = async (req, res) => {
    const games = await gameService.getAll();
    return res.status(200).json(games);
};

export { getAll };
