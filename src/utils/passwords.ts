import crypto from 'crypto';

export function hashPassword(password: string, email: string): string {
    const secret = process.env.APP_SECRET;
    if (!secret) {
        throw new Error("APP_SECRET is not defined in the environment variables.");
    }

    const salt = `${email}:${secret}`;
    const iterations = 100000;
    const keyLength = 64;
    const digest = 'sha512';

    return crypto.pbkdf2Sync(
        password,
        salt,
        iterations,
        keyLength,
        digest
    ).toString('hex');
}

console.log('admin: ', hashPassword('admin@example.com', 'admin123'));
console.log('vendedor: ', hashPassword('vendedor@example.com', 'vendedor123'));
console.log('usuario: ', hashPassword('usuario@example.com', 'usuario123'));
