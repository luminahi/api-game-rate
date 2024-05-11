import express from "express";
import { gameRouter } from "./routes/game.js";
import { userRouter } from "./routes/user.js";
import { accessControl } from "./shared/middlewares/auth/accessControl.js";
import { ratingRouter } from "./routes/rating.js";
import { errorHandler } from "./shared/middlewares/handlers/errorHandler.js";

const server = express();
server.use(express.json());

server.use("/api/v1/games", accessControl, gameRouter);
server.use("/api/v1/ratings", ratingRouter);
server.use("/auth", userRouter);

server.use("/api/v1/", errorHandler);

server.get("/", async (req, res) => {
    res.json({ msg: "index" });
});

export { server };
