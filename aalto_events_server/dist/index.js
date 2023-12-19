"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./utils/config");
const server = http_1.default.createServer(app_1.default);
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});
