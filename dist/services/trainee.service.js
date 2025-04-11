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
exports.getTraineeBookings = exports.cancelBooking = exports.bookClass = exports.getTraineeById = exports.getAllTrainees = exports.createTrainee = void 0;
const trainee_model_1 = __importDefault(require("../models/trainee.model"));
const schedule_model_1 = __importDefault(require("../models/schedule.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants/constants");
const createTrainee = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingTrainee = yield trainee_model_1.default.findOne({ email });
        if (existingTrainee) {
            throw new Error('Trainee with this email already exists.');
        }
        const trainee = new trainee_model_1.default({ name, email });
        yield trainee.save();
        return { success: true, statusCode: 201, message: 'Trainee created successfully', data: trainee };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
});
exports.createTrainee = createTrainee;
const getAllTrainees = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainees = yield trainee_model_1.default.find();
        return { success: true, statusCode: 200, data: trainees };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
});
exports.getAllTrainees = getAllTrainees;
const getTraineeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee = yield trainee_model_1.default.findById(id);
        if (!trainee) {
            return { success: false, statusCode: 404, message: 'Trainee not found.' };
        }
        return { success: true, statusCode: 200, data: trainee };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
});
exports.getTraineeById = getTraineeById;
const bookClass = (traineeId, scheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee = yield trainee_model_1.default.findById(traineeId);
        const schedule = yield schedule_model_1.default.findById(scheduleId);
        if (!trainee || !schedule) {
            return { success: false, statusCode: 400, message: 'Invalid trainee or schedule ID.' };
        }
        if (schedule.trainees.length >= constants_1.MAX_TRAINEES_PER_CLASS) {
            return {
                success: false,
                statusCode: 400,
                message: `Class schedule is full. Maximum ${constants_1.MAX_TRAINEES_PER_CLASS} trainees allowed per schedule.`,
            };
        }
        if (trainee.bookedClasses.some(bookedClassId => bookedClassId.equals(new mongoose_1.default.Types.ObjectId(scheduleId)))) {
            return { success: false, statusCode: 409, message: 'You have already booked this class.' };
        }
        const overlappingBooking = yield schedule_model_1.default.findOne({
            _id: { $in: trainee.bookedClasses },
            date: schedule.date,
            $or: [
                { startTime: schedule.startTime, endTime: schedule.endTime },
            ],
        });
        if (overlappingBooking) {
            return { success: false, statusCode: 409, message: 'You cannot book multiple classes in the same time slot.' };
        }
        schedule.trainees.push(new mongoose_1.default.Types.ObjectId(traineeId));
        trainee.bookedClasses.push(new mongoose_1.default.Types.ObjectId(scheduleId));
        yield schedule.save();
        yield trainee.save();
        return {
            success: true,
            statusCode: 201,
            message: 'Class booked successfully.',
            data: { schedule },
        };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
});
exports.bookClass = bookClass;
const cancelBooking = (traineeId, scheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee = yield trainee_model_1.default.findById(traineeId);
        const schedule = yield schedule_model_1.default.findById(scheduleId);
        if (!trainee || !schedule) {
            return { success: false, statusCode: 400, message: 'Invalid trainee or schedule ID.' };
        }
        if (!trainee.bookedClasses.some(bookedClassId => bookedClassId.equals(new mongoose_1.default.Types.ObjectId(scheduleId)))) {
            return { success: false, statusCode: 400, message: 'You have not booked this class.' };
        }
        schedule.trainees = schedule.trainees.filter((id) => !id.equals(new mongoose_1.default.Types.ObjectId(traineeId)));
        trainee.bookedClasses = trainee.bookedClasses.filter((id) => !id.equals(new mongoose_1.default.Types.ObjectId(scheduleId)));
        yield schedule.save();
        yield trainee.save();
        return { success: true, statusCode: 200, message: 'Booking cancelled successfully.', data: { schedule } };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
});
exports.cancelBooking = cancelBooking;
const getTraineeBookings = (traineeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(traineeId)) {
            const error = new Error('Invalid Trainee ID format.');
            error.statusCode = 400;
            throw error;
        }
        const trainee = yield trainee_model_1.default.findById(traineeId).populate('bookedClasses');
        console.log('Fetched trainee:', trainee);
        if (!trainee) {
            const error = new Error('Trainee not found.');
            error.statusCode = 404;
            console.error('Throwing trainee not found error:', error);
            throw error;
        }
        return trainee.bookedClasses;
    }
    catch (error) {
        console.error('Error fetching trainee bookings:', error);
        throw error;
    }
});
exports.getTraineeBookings = getTraineeBookings;
