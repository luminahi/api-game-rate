import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
    try {
        let hashedPassword = "";
        const salt = await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
        }
    }
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
