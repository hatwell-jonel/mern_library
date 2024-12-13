import statusCode from "../statusCode.js";

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        console.log("req", req.user);
        next();
    } else {
        res.status(statusCode.UNAUTHORIZED).json({ message: 'Access denied: Admins only' });
    }
};

export default adminMiddleware;