import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";
import { verifyJwtToken } from "../../shared/util/jwtUtil.js";
import { getByEmail } from "../../database/services/user/getByEmail.js";

const patchById: Handler = async (req, res, next) => {
    const ratingId = Number.parseInt(req.params.id);
    const { rating } = req.body;

    const [, token] = req.headers.authorization!.split(" ");
    const { email } = verifyJwtToken(token);
    const user = await getByEmail(email);

    if (user.isFailure()) return next(user);

    const result = await ratingService.patchById(
        ratingId,
        user.unwrap(),
        rating
    );

    if (result.isFailure()) return next(result);

    res.status(204).json();
};

export { patchById };
