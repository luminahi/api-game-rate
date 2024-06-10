import { randomBytes } from "crypto";

export default function () {
    process.env.JWT_SECRET = randomBytes(32).toString("base64");
}
