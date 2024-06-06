import { testServer } from "../testServer.js";

describe("sign up", () => {
    it("register a new user", async () => {
        const user = {
            username: "john francis",
            email: "francis@mail.com",
            password: "10102020",
        };

        const res = await testServer
            .post("/auth/signup")
            .send(user)
            .expect(201);

        expect(res.body).toHaveProperty("user.username", "john francis");
        expect(res.body).toHaveProperty("user.email", "francis@mail.com");
    });

    it("tries to register a new user with no username", async () => {
        const user = {
            email: "francis@mail.com",
            password: "10102020",
        };

        const res = await testServer
            .post("/auth/signup")
            .send(user)
            .expect(400);

        expect(res.body).toHaveProperty(
            "errors.0",
            "username is a required field"
        );
    });

    it("tries to register a new user with no email", async () => {
        const user = {
            username: "john francis",
            password: "10102020",
        };

        const res = await testServer
            .post("/auth/signup")
            .send(user)
            .expect(400);

        expect(res.body).toHaveProperty(
            "errors.0",
            "email is a required field"
        );
    });

    it("tries to register a new user with no password", async () => {
        const user = {
            username: "john francis",
            email: "francis@mail.com",
        };

        const res = await testServer
            .post("/auth/signup")
            .send(user)
            .expect(400);

        expect(res.body).toHaveProperty(
            "errors.0",
            "password is a required field"
        );
    });

    it("tries to register a new user with a invalid email", async () => {
        const user = {
            username: "john francis",
            email: "francis-mail.com",
            password: "10102020",
        };

        const res = await testServer
            .post("/auth/signup")
            .send(user)
            .expect(400);

        expect(res.body).toHaveProperty(
            "errors.0",
            "email must be a valid email"
        );
    });
});
