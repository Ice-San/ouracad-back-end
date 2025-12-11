import jsonwebtoken from 'jsonwebtoken';

const { JWT_KEY } = process.env;

export const generateToken = (payload: Object | string) => {
    return jsonwebtoken.sign(payload, JWT_KEY as string, { expiresIn: '7d' });
}