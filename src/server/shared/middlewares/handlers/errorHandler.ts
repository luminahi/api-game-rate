import { ErrorRequestHandler } from "express";
import { Result } from "../../util/Result";

const errorHandler: ErrorRequestHandler = (
    err: Result<null>,
    req,
    res,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next
) => {
    return res.status(err.errCode || 500).json({ message: err.errMessage });
};

export { errorHandler };
