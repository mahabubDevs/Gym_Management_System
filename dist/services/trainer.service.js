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
exports.getTrainerById = exports.getAllTrainers = exports.createTrainer = void 0;
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
const createTrainer = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTrainer = yield trainer_model_1.default.findOne({ email });
    if (existingTrainer) {
        throw new Error('Trainer with this email already exists.');
    }
    const trainer = new trainer_model_1.default({ name, email });
    yield trainer.save();
    return trainer;
});
exports.createTrainer = createTrainer;
const getAllTrainers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield trainer_model_1.default.find();
});
exports.getAllTrainers = getAllTrainers;
const getTrainerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield trainer_model_1.default.findById(id);
    if (!trainer) {
        throw new Error('Trainer not found.');
    }
    return trainer;
});
exports.getTrainerById = getTrainerById;
