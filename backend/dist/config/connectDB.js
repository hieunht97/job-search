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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DB_NAME = process.env.DB_NAME;
        const MONGO_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`;
        if (!DB_NAME) {
            throw new Error("DB_NAME is not defined in environment variables.");
        }
        yield mongoose_1.default.connect(MONGO_URI);
        console.log(`[INFO]: Successfully connected to database | ${DB_NAME}`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`[ERROR]: Failed to connect to database | ${err.message}`);
        }
        else {
            console.error(`[ERROR]: Unknown error occurred while connecting to database.`);
        }
        throw new Error("Failed to connect to database");
    }
});
exports.default = connectDB;
