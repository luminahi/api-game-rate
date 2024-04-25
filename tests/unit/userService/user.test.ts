import connection from "../../../src/server/database/connection.js";
import { User } from "../../../src/server/database/entities/User.js";
import { userService } from "../../../src/server/database/services/user/index.js";
import { verifyPassword } from "../../../src/server/shared/auth/passwordHash.js";

beforeAll(async () => {
    const repository = connection.getRepository(User);

    const user1 = new User();
    const user2 = new User();
    const user3 = new User();

    user1.username = "lima alex";
    user1.email = "alex@mail.com";
    user1.password = "00001111";

    user2.username = "sarah sousa";
    user2.email = "sarah@mail.com";
    user2.password = "11001111";

    user3.username = "karin doe";
    user3.email = "karin@mail.com";
    user3.password = "00110011";

    await repository.save([user1, user2, user3]);
});

describe("userService", () => {
    it("count", async () => {
        const userCount = await userService.count();

        expect(userCount).not.toBeUndefined();
        expect(userCount).toBe(3);
    });

    it("get one user by id", async () => {
        const user = await userService.getById(1);

        expect(user).not.toBeNull();
        expect(user).toBeInstanceOf(User);
        expect(user?.id).toBe(1);
    });

    it("creates a entry", async () => {
        const user = new User();

        user.username = "fourth";
        user.email = "fourth@mail.com";
        user.password = "44441111";

        const savedUser = await userService.create(user);

        if (!savedUser) fail();

        expect(savedUser).not.toBeNull();
        expect(savedUser.username).toBe("fourth");
        expect(savedUser.email).toBe("fourth@mail.com");
        expect(savedUser.password).toBeDefined();
        expect(savedUser.id).toBeDefined();

        const passwordCheck = await verifyPassword(
            user.password,
            savedUser.password
        );

        expect(passwordCheck).toBe(true);
    });
});
