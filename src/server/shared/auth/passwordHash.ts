import bcrypt from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
    try {
        let hashedPassword = "";
        const salt = await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        return "";
    }
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
