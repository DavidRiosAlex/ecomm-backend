import crypto from 'crypto';

export function hashPassword(password: string, email: string): Promise<string> {
    const secret = process.env.APP_SECRET;
    if (!secret) {
        throw new Error("APP_SECRET is not defined in the environment variables.");
    }

    const salt = `${email}:${secret}`;
    const iterations = 100000;
    const keyLength = 64;
    const digest = 'sha512';

    return new Promise((res, rej) => {
        crypto.pbkdf2(
            password,
            salt,
            iterations,
            keyLength,
            digest,
            (err, derivedKey) => {
                if (err) {
                    rej(err);
                } else {
                    res(derivedKey.toString('hex'));
                }
            }
        );
    });
}

