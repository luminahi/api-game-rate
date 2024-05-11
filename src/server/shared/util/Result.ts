/**
 *
 */
class Result<T> {
    public readonly value: T | null;
    public readonly errCode?: number;
    public readonly errMessage?: string;

    private constructor(
        value: T | null,
        errCode?: number,
        errMessage?: string
    ) {
        this.value = value;
        this.errCode = errCode;
        this.errMessage = errMessage;
    }

    public isFailure(): boolean {
        return this.value ? false : true;
    }

    public isSuccess(): boolean {
        return this.value ? true : false;
    }

    public static asFailure(errCode: number, errMessage: string): Result<null> {
        return new Result(null, errCode, errMessage);
    }

    public unwrap(): T {
        if (this.value) return this.value;
        throw new Error("value is not present");
    }

    public static wrap<S>(value: S): Result<S> {
        return new Result(value);
    }
}

export { Result };
