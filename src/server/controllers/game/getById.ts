import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const getById: Handler = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: `invalid id: ${id}` });

    const game = await gameService.getById(id);
    if (!game) return res.status(404).json({ error: "not found" });

    return res.status(200).json({ game });
};

export { getById };
