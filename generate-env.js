#!/usr/bin/env node

import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";

const settings = {
    port: "3000",
    hostname: "localhost",
    node_env: "development",
    jwt_secret: randomBytes(32).toString("base64"),
};

/**
 *
 * @param {object} args
 */
const generateEnv = (args) => {
    const filePath = path.resolve(".env");
    const lines = Object.entries(args);
    let fd;

    try {
        fd = fs.openSync(filePath, "w");

        lines.forEach((line) => {
            fs.writeFileSync(fd, `${line[0].toUpperCase()}="${line[1]}"\n`);
        });
    } catch (err) {
        if (err instanceof Error) console.error(err.message);
    } finally {
        if (fd) fs.closeSync(fd);
    }
};

generateEnv(settings);
