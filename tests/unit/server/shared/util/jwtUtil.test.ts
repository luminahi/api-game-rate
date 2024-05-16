import { IUser } from "../../../../../src/server/database/entities/user/IUser.js";
import { generateJwtToken } from "../../../../../src/server/shared/util/jwtUtil.js";
import { verifyJwtToken } from "../../../../../src/server/shared/util/jwtUtil.js";
import { fail } from "assert";

describe("jwtUtil", () => {
    it("generates a access token", () => {
        const user: IUser = {
            email: "george@mail.com",
            username: "george",
        };

        const token = generateJwtToken(user);

        expect(token).toBeDefined();
        expect(token.split(".")).toHaveLength(3);
    });

    it("verifies a access token", () => {
        const user: Omit<IUser, "password"> = {
            email: "kasimiro@mail.com",
            username: "kasimir",
        };

        const token = generateJwtToken(user);
        const data = verifyJwtToken(token);

        expect(data.email).toBe("kasimiro@mail.com");
        expect(data.username).toBe("kasimir");

        if (!data.iat || !data.exp) fail();

        expect(data.exp).toBeGreaterThan(data.iat);
    });

    it("ignores any field besides username and email in token creation", () => {
        const user: IUser = {
            email: "kasimiro@mail.com",
            username: "kasimir",
            password: "should be ignored",
            id: 404,
        };

        const token = generateJwtToken(user);
        const data = verifyJwtToken(token);

        if (!data) fail();

        expect(data.username).toBeDefined();
        expect(data.email).toBeDefined();
        expect(data.password).toBeUndefined();
        expect(data.id).toBeUndefined();
    });

    it("tries to validate a token with a empty secret", () => {
        const aux = process.env.JWT_SECRET;
        process.env.JWT_SECRET = "";

        const user: IUser = {
            email: "george@mail.com",
            username: "george",
        };

        expect(() => {
            generateJwtToken(user);
        }).toThrow();

        process.env.JWT_SECRET = aux;
    });

    it("tries to verify a token with a empty secret", () => {
        const user: IUser = {
            email: "george@mail.com",
            username: "george",
        };

        const token = generateJwtToken(user);

        const aux = process.env.JWT_SECRET;
        process.env.JWT_SECRET = "";

        expect(() => {
            verifyJwtToken(token);
        }).toThrow();

        process.env.JWT_SECRET = aux;
    });
});
