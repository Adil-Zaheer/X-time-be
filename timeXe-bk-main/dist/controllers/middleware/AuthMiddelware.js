"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        // if (!process.env.JWT_SECRET) {
        //   throw new Error("JWT_SECRET environment variable is not defined");
        // }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET ||
            "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506");
        const userId = decodedToken.userId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.sendStatus(401);
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error authenticating user:", error);
        res.sendStatus(401);
    }
});
exports.authenticateUser = authenticateUser;
