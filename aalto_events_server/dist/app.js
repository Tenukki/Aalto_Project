"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./utils/config");
const Events_1 = __importDefault(require("./controllers/Events"));
const Index_1 = __importDefault(require("./controllers/Index"));
const requestlogger_1 = __importDefault(require("./middleware/requestlogger"));
const app = (0, express_1.default)();
const connURL = config_1.MONGOURL;
mongoose_1.default.connect(connURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, })
    .then(() => {
    console.log('Connected to mongoDB');
})
    .catch((e) => {
    console.log('Error connecting,', e.message);
});
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(requestlogger_1.default);
app.use(express_1.default.json());
app.use('/api/events', Events_1.default);
app.use('/', Index_1.default);
exports.default = app;
