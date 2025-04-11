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
exports.getSchedulesByDate = exports.deleteSchedule = exports.updateSchedule = exports.getScheduleById = exports.getAllSchedules = exports.createSchedule = void 0;
const schedule_model_1 = __importDefault(require("../models/schedule.model"));
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants/constants");
const createSchedule = (date, startTime, endTime, trainerId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTrainer = yield trainer_model_1.default.findById(trainerId);
    if (!existingTrainer) {
        throw new Error('Trainer not found.');
    }
    const existingSchedulesOnDate = yield schedule_model_1.default.find({ date });
    if (existingSchedulesOnDate.length >= constants_1.MAX_CLASSES_PER_DAY) {
        throw new Error(`Maximum ${constants_1.MAX_CLASSES_PER_DAY} schedules allowed per day.`);
    }
    const newSchedule = new schedule_model_1.default({ date, startTime, endTime, trainer: trainerId });
    yield newSchedule.save();
    return newSchedule;
});
exports.createSchedule = createSchedule;
const getAllSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield schedule_model_1.default.find().populate('trainer', 'name email').populate('trainees', 'name email');
});
exports.getAllSchedules = getAllSchedules;
const getScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.default.findById(id).populate('trainer', 'name email').populate('trainees', 'name email');
    if (!schedule) {
        throw new Error('Schedule not found.');
    }
    return schedule;
});
exports.getScheduleById = getScheduleById;
const updateSchedule = (id, date, startTime, endTime, trainerId) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.default.findById(id);
    if (!schedule) {
        throw new Error('Schedule not found.');
    }
    if (date)
        schedule.date = date;
    if (startTime)
        schedule.startTime = startTime;
    if (endTime)
        schedule.endTime = endTime;
    if (trainerId) {
        const trainer = yield trainer_model_1.default.findById(trainerId);
        if (!trainer) {
            throw new Error('Trainer not found.');
        }
        // schedule.trainer = trainerId;
        schedule.trainer = new mongoose_1.default.Types.ObjectId(trainerId);
    }
    yield schedule.save();
    return schedule;
});
exports.updateSchedule = updateSchedule;
const deleteSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.default.findByIdAndDelete(id);
    if (!schedule) {
        throw new Error('Schedule not found.');
    }
    return { message: 'Schedule deleted successfully.' };
});
exports.deleteSchedule = deleteSchedule;
const getSchedulesByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    return yield schedule_model_1.default.find({ date }).populate('trainer', 'name email').populate('trainees', 'name email');
});
exports.getSchedulesByDate = getSchedulesByDate;
