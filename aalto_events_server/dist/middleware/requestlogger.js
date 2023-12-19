"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger = (req, res, next) => {
    console.log('---------------------------');
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('---------------------------');
    next();
};
exports.default = requestLogger;
