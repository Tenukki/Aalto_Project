"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IndexRouter = (0, express_1.Router)();
IndexRouter.get('/', async (req, res, next) => {
    try {
        res.status(200).send("hello!!!!!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.default = IndexRouter;
