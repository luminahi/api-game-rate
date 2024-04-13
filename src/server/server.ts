import express from "express";
import { gameRouter } from "./routes/game.js";

const server = express();
server.use(express.json({}));

server.use("/api/v1/games", gameRouter);

server.get("/", async (req, res) => {
    res.json({ msg: "message" });
});

export { server };
