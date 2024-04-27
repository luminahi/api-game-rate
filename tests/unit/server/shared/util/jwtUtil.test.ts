import { IUser } from "../../../../../src/server/database/entities/IUser.js";
import { generateAccessToken } from "../../../../../src/server/shared/util/jwtUtil.js";
import { verifyAccessToken } from "../../../../../src/server/shared/util/jwtUtil.js";

describe("jwtUtil", () => {
    it("is a valid token", () => {
        const user: IUser = {
            email: "george@mail.com",
            username: "george",
        };

        const token = generateAccessToken(user);

        expect(token).not.toEqual("");
        expect(token.split(".")).toHaveLength(3);
    });

    it("returns the correct data", () => {
        const user: Omit<IUser, "password"> = {
            email: "kasimiro@mail.com",
            username: "kasimir",
        };

        const token = generateAccessToken(user);
        const data = verifyAccessToken(token);

        if (!data) fail();

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

        const token = generateAccessToken(user);
        const data = verifyAccessToken(token);

        if (!data) fail();

        expect(data.username).toBeDefined();
        expect(data.email).toBeDefined();
        expect(data.password).toBeUndefined();
        expect(data.id).toBeUndefined();
    });
});
