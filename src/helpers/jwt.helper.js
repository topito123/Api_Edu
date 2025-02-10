import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        secret,
        { expiresIn: '2h' }
    );  
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};