import { User } from "../../src/server/database/entities/user/User.js";
import { userService } from "../../src/server/database/services/user/index.js";

const user = {
    email: "test@mail.com",
    password: "10101010",
    username: "tester",
} as User;

const signTester = async () => await userService.create(user);

const getToken = () => userService.generateAccessToken(user);

export { getToken, signTester };
