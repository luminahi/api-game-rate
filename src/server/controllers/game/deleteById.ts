import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const deleteById: Handler = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (!id)
        return res.status(400).json({ error: `invalid id: ${req.params.id}` });

    await gameService.deleteById(id);

    res.status(204).send();
};

export { deleteById };
