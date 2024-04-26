import express from "express";
import { gameRouter } from "./routes/game.js";
import { userRouter } from "./routes/user.js";
import { accessControl } from "./shared/middlewares/auth/accessControl.js";

const server = express();
server.use(express.json({}));

server.use("/api/v1/games", accessControl, gameRouter);
server.use("/api/v1/ratings", (_, res) => res.json({ msg: "not implemented" }));
server.use("/auth", userRouter);

server.get("/", async (req, res) => {
    res.json({ msg: "message" });
});

export { server };
