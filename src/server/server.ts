import express from "express";
import { AppDataSource } from "../database/data-source.js";
import { Game } from "../database/entity/Game.js";

const server = express();

const dataSource = await AppDataSource.initialize();

server.get("/", async (req, res) => {
    res.json({ msg: "message" });
});

export { server };
