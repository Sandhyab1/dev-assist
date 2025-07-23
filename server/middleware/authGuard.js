import jwt from 'jsonwebtoken';

export const adminAuthGuard = (req, res, next) => {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    token = token.split(' ')[1]; // Remove 'Bearer' prefix
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
        console.log("🚀 ~ jwt.verify ~ decoded:", decoded)
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if(!decoded.role || (!decoded.role.includes('admin') && !decoded.role.includes('moderator'))) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        // If token is valid, attach user info to request object
        // and proceed to the next middleware or route handler
        req.user = decoded;
        next();
    });
};

export const userAuthGuard = (req, res, next) => {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    token = token.split(' ')[1]; // Remove 'Bearer' prefix
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // If token is valid, attach user info to request object
        // and proceed to the next middleware or route handler
        // For Firebase, you might want to check the role here as well
        req.user = decoded;
        next();
    });
};


