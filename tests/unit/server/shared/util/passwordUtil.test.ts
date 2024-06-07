import {
    hashPassword,
    verifyPassword,
} from "../../../../../src/server/shared/util/passwordUtil.js";

describe("passwordUtil", () => {
    it("hashes a password", async () => {
        const hashedPassword = await hashPassword("my_cool_password");

        expect(typeof hashedPassword === "string").toBe(true);
        expect(hashedPassword.substring(0, 7)).toBe("$2a$10$");
    });

    it("hashes a empty password", async () => {
        const hashedPassword = await hashPassword("");

        expect(typeof hashedPassword === "string").toBe(true);
        expect(hashedPassword.substring(0, 7)).toBe("$2a$10$");
    });

    it("verifies a valid password", async () => {
        const password = "|__my$cool$pass$word__|";

        const hashedPassword = await hashPassword(password);

        const isValidPassword = await verifyPassword(password, hashedPassword);

        expect(isValidPassword).toBe(true);
    });

    it("verifies a invalid password", async () => {
        const password = "|__my$cool$pass$word__|";
        const anotherPassword = "|__my$cool$pass$word_|";

        const hashedPassword = await hashPassword(password);

        const isValidPassword = await verifyPassword(
            anotherPassword,
            hashedPassword
        );

        expect(isValidPassword).toBe(false);
    });
});
