import { server } from "./server/server.js";

const port = Number.parseInt(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || "localhost";

server.listen(port, hostname, () => {
    console.log(`application running at http://${hostname}:${port}`);
});
