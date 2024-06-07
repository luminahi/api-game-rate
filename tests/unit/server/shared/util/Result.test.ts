import { Result } from "../../../../../src/server/shared/util/Result.js";

interface User {
    name: string;
    age: number;
    createdAt: number;
}

describe("Result", () => {
    it("wraps a non-null object and return a success", () => {
        const user: User = {
            name: "sarah",
            age: 19,
            createdAt: Date.now(),
        };

        const result = Result.wrap<User>(user);

        expect(result.isSuccess()).toBe(true);
        expect(result.errMessage).toBeUndefined();
        expect(result.errCode).toBeUndefined();
    });

    it("wraps a null object and return a failure", () => {
        const user: User = null as unknown as User;

        const result = Result.wrap<User>(user);

        expect(result.isFailure()).toBe(true);
        expect(result.errMessage).toBeUndefined();
        expect(result.errCode).toBeUndefined();
    });

    it("unwraps a non-null object", () => {
        const user: User = {
            name: "sarah",
            age: 19,
            createdAt: Date.now(),
        };

        const result = Result.wrap(user);

        expect(result.isSuccess()).toBe(true);
        expect(result.unwrap()).toEqual(user);
    });

    it("unwraps a null object", () => {
        const user: User = null as unknown as User;

        const result = Result.wrap(user);
        expect(result.isFailure()).toBe(true);
        expect(result.unwrap).toThrow();
    });

    it("returns a Result instance as a failure", () => {
        const result = Result.asFailure(500, "error message");

        expect(result.isFailure()).toBe(true);
        expect(result.errCode).toBeDefined();
        expect(result.errMessage).toBeDefined();
        expect(result.unwrap).toThrow();
    });
});
