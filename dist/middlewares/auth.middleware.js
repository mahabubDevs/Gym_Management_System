"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access.',
                errorDetails: `You must be a ${roles.join(' or ')} to perform this action.`,
            });
        }
        next();
    };
};
exports.authorize = authorize;
