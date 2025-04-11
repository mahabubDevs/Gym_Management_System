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
exports.getTraineeBookings = exports.cancelBooking = exports.bookClass = exports.getTraineeById = exports.getAllTrainees = exports.createTrainee = void 0;
const TraineeService = __importStar(require("../services/trainee.service"));
const createTrainee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const trainee = yield TraineeService.createTrainee(name, email);
        res.status(201).json({ success: true, message: 'Trainee created successfully.', data: trainee });
    }
    catch (error) {
        next(error);
    }
});
exports.createTrainee = createTrainee;
const getAllTrainees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainees = yield TraineeService.getAllTrainees();
        res.status(200).json({ success: true, data: trainees });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTrainees = getAllTrainees;
const getTraineeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const trainee = yield TraineeService.getTraineeById(id);
        res.status(200).json({ success: true, data: trainee });
    }
    catch (error) {
        next(error);
    }
});
exports.getTraineeById = getTraineeById;
const bookClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const traineeId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { scheduleId } = req.body;
        if (!traineeId) {
            return res.status(401).json({ success: false, message: 'Unauthorized access.' });
        }
        const result = yield TraineeService.bookClass(traineeId, scheduleId);
        res.status(201).json({ success: true, statusCode: 201, message: result.message, Data: result.data });
    }
    catch (error) {
        if (error.message === 'Class schedule is full. Maximum 10 trainees allowed per schedule.') {
            return res.status(400).json({ success: false, message: error.message });
        }
        else if (error.message === 'You have already booked this class.' || error.message === 'You cannot book multiple classes in the same time slot.') {
            return res.status(409).json({ success: false, message: error.message });
        }
        next(error);
    }
});
exports.bookClass = bookClass;
const cancelBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const traineeId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { scheduleId } = req.body;
        if (!traineeId) {
            return res.status(401).json({ success: false, message: 'Unauthorized access.' });
        }
        const result = yield TraineeService.cancelBooking(traineeId, scheduleId);
        res.status(200).json({ success: true, message: result.message, Data: result.data });
    }
    catch (error) {
        next(error);
    }
});
exports.cancelBooking = cancelBooking;
const getTraineeBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("ami");
    try {
        console.log('req.user:', req.user);
        console.log("ami");
        const traineeId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!traineeId) {
            return res.status(401).json({ success: false, message: 'Unauthorized access.' });
        }
        const bookings = yield TraineeService.getTraineeBookings(traineeId);
        if (!Array.isArray(bookings)) {
            return res.status(500).json({ success: false, message: 'Failed to fetch bookings.' });
        }
        res.status(200).json({ success: true, data: bookings });
    }
    catch (error) {
        console.error('Error in controller:', error);
        next(error);
    }
});
exports.getTraineeBookings = getTraineeBookings;
