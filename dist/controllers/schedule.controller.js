"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedulesByDate = exports.deleteSchedule = exports.updateSchedule = exports.getScheduleById = exports.getAllSchedules = exports.createSchedule = void 0;
const ScheduleService = __importStar(require("../services/schedule.service"));
const createSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, startTime, endTime, trainerId } = req.body;
        const newDate = new Date(date);
        const schedule = yield ScheduleService.createSchedule(newDate, startTime, endTime, trainerId);
        res.status(201).json({ success: true, message: 'Schedule created successfully.', data: schedule });
    }
    catch (error) {
        if (error.message.startsWith('Maximum')) {
            return res.status(400).json({ success: false, message: error.message });
        }
        next(error);
    }
});
exports.createSchedule = createSchedule;
const getAllSchedules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield ScheduleService.getAllSchedules();
        res.status(200).json({ success: true, data: schedules });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSchedules = getAllSchedules;
const getScheduleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const schedule = yield ScheduleService.getScheduleById(id);
        res.status(200).json({ success: true, data: schedule });
    }
    catch (error) {
        next(error);
    }
});
exports.getScheduleById = getScheduleById;
const updateSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { date, startTime, endTime, trainerId } = req.body;
        const updatedSchedule = yield ScheduleService.updateSchedule(id, date ? new Date(date) : undefined, startTime, endTime, trainerId);
        res.status(200).json({ success: true, message: 'Schedule updated successfully.', data: updatedSchedule });
    }
    catch (error) {
        next(error);
    }
});
exports.updateSchedule = updateSchedule;
const deleteSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield ScheduleService.deleteSchedule(id);
        res.status(200).json({ success: true, message: result.message });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSchedule = deleteSchedule;
const getSchedulesByDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.params;
        const searchDate = new Date(date);
        const schedules = yield ScheduleService.getSchedulesByDate(searchDate);
        res.status(200).json({ success: true, data: schedules });
    }
    catch (error) {
        next(error);
    }
});
exports.getSchedulesByDate = getSchedulesByDate;
