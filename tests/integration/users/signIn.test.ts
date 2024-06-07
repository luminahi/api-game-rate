import { testServer } from "../testServer.js";
import { insertUser, testUser } from "../../testSetup.js";

beforeAll(async () => insertUser());

describe("sign in", () => {
    it("authenticate a registered user", async () => {
        const { email, password } = testUser;

        const res = await testServer
            .post("/auth/signin")
            .send({ email, password })
            .expect(200);

        expect(res.body).toHaveProperty("token");
    });

    it("tries to authenticate a registered user without password", async () => {
        const res = await testServer
            .post("/auth/signin")
            .send({ email: "unknown@mail.com" })
            .expect(400);

        expect(res.body).toHaveProperty(
            "errors.0",
            "password is a required field"
        );
    });

    it("tries to authenticate a registered user with a invalid password", async () => {
        const user = { email: testUser.email, password: "invalid-password" };

        const res = await testServer
            .post("/auth/signin")
            .send(user)
            .expect(401);

        expect(res.body).toHaveProperty("message", "invalid email/password");
    });

    it("tries to authenticate a unregistered user", async () => {
        const unknownUser = {
            email: "unknown@mail.com",
            password: "unknown2020",
        };

        const res = await testServer
            .post("/auth/signin")
            .send(unknownUser)
            .expect(401);

        expect(res.body).toHaveProperty("message", "invalid email/password");
    });
});
