"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    var _a;
    console.error(err.stack);
    const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
    res.status(statusCode).json(Object.assign({ success: (_a = err.success) !== null && _a !== void 0 ? _a : false, message: err.message || 'Something went wrong!', errorDetails: err.errorDetails || undefined }, (process.env.NODE_ENV === 'development' && { stack: err.stack })));
};
exports.errorHandler = errorHandler;
