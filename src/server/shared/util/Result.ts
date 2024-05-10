/**
 *
 */
class Result<T> {
    public readonly value: T;

    private constructor(value: T) {
        this.value = value;
    }

    public get(): T {
        return this.value;
    }

    public isError(): boolean {
        return this.value ? false : true;
    }

    public isSuccess(): boolean {
        return this.value ? true : false;
    }

    public static asError(): Result<null> {
        return new Result(null);
    }

    public static asSuccess(value: unknown): Result<unknown> {
        return new Result(value);
    }
}

export { Result };
