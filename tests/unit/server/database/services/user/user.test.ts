import { User } from "../../../../../../src/server/database/entities/user/User.js";
import { userService } from "../../../../../../src/server/database/services/user/index.js";
import { verifyPassword } from "../../../../../../src/server/shared/util/passwordUtil.js";
import { fail } from "assert";
import { insertUserData } from "../../../../../testSetup.js";
import connection from "../../../../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    await insertUserData();
});

describe("userService", () => {
    it("counts the number of users", async () => {
        const result = await userService.count();
        const count = result.unwrap();

        expect(count).toBeDefined();
        expect(count).toBe(3);
    });

    it("retrieves one user by id", async () => {
        const result = await userService.getById(1);
        const user = result.unwrap();

        if (!user) fail();

        expect(user.username).toBe("lima alex");
        expect(user.id).toBe(1);
    });

    it("retrieves one user by email", async () => {
        const result = await userService.getByEmail("sarah@mail.com");
        const user = result.unwrap();

        if (!user) fail();

        expect(user.username).toBe("sarah sousa");
        expect(user.email).toBe("sarah@mail.com");
    });

    it("creates a user", async () => {
        const user = {
            username: "fourth",
            email: "fourth@mail.com",
            password: "44441111",
        } as User;

        const result = await userService.create(user);
        const savedUser = result.unwrap();

        if (!savedUser) fail();

        const countResult = await userService.count();
        const count = countResult.unwrap();

        expect(count).toBe(4);
        expect(savedUser.username).toBe("fourth");
        expect(savedUser.email).toBe("fourth@mail.com");

        const passwordCheck = await verifyPassword(
            user.password,
            savedUser.password
        );

        expect(passwordCheck).toBe(true);
    });

    it("updates a user by id", async () => {
        const id = 1;

        const user = {
            email: "updarius@mail.com",
            username: "up darius",
            password: "55550000",
        } as User;

        const updateResult = await userService.updateById(id, user);

        expect(updateResult.unwrap()).toBe(1);

        const getResult = await userService.getByEmail(user.email);
        const updatedUser = getResult.unwrap();

        if (!updatedUser) fail();

        expect(updatedUser.username).toBe("up darius");
        expect(updatedUser.email).toBe("updarius@mail.com");
        expect(updatedUser.id).toBe(1);

        const passwordCheck = await verifyPassword(
            "55550000",
            updatedUser.password
        );

        expect(passwordCheck).toBe(true);
    });
});
