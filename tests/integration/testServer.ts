import { server } from "../../src/server/server.js";
import supertest from "supertest";

const testServer = supertest(server);

export { testServer };
