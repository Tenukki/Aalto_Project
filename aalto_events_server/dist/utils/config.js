"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIPASS = exports.MONGOURL = exports.PORT = void 0;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
exports.PORT = process.env.PORT;
exports.MONGOURL = process.env.MONGOURL;
exports.APIPASS = process.env.APIPASS;
