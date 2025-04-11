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
exports.login = exports.registerTrainee = exports.registerAdmin = exports.registerTrainer = void 0;
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
const trainee_model_1 = __importDefault(require("../models/trainee.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const constants_1 = require("../constants/constants");
const SALT_ROUNDS = 10;
const registerTrainer = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingTrainer = yield trainer_model_1.default.findOne({ email });
        if (existingTrainer) {
            throw new Error('Trainer with this email already exists.');
        }
        const hashedPassword = password ? yield bcrypt_1.default.hash(password, SALT_ROUNDS) : undefined;
        const trainer = new trainer_model_1.default({ name, email, password: hashedPassword, role: constants_1.UserRole.TRAINER });
        yield trainer.save();
        return { message: 'Trainer registered successfully.' };
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            let formattedErrorDetails;
            const errorFields = Object.keys(errors);
            if (errorFields.length === 1) {
                const field = errorFields[0];
                formattedErrorDetails = {
                    field: field,
                    message: errors[field],
                };
            }
            else {
                formattedErrorDetails = errorFields.reduce((acc, field) => {
                    acc[field] = {
                        field,
                        message: errors[field],
                    };
                    return acc;
                }, {});
            }
            throw {
                success: false,
                message: 'Validation error occurred.',
                errorDetails: formattedErrorDetails,
            };
        }
        throw {
            success: false,
            message: error.message || 'Something went wrong.',
        };
    }
});
exports.registerTrainer = registerTrainer;
const registerAdmin = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingAdmin = yield trainer_model_1.default.findOne({ email });
        if (existingAdmin) {
            throw new Error('Admin with this email already exists.');
        }
        const hashedPassword = password ? yield bcrypt_1.default.hash(password, SALT_ROUNDS) : undefined;
        const admin = new trainer_model_1.default({ name, email, password: hashedPassword, role: constants_1.UserRole.ADMIN });
        yield admin.save();
        return { message: 'Admin registered successfully.' };
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            let formattedErrorDetails;
            const errorFields = Object.keys(errors);
            if (errorFields.length === 1) {
                const field = errorFields[0];
                formattedErrorDetails = {
                    field,
                    message: errors[field],
                };
            }
            else {
                formattedErrorDetails = errorFields.reduce((acc, field) => {
                    acc[field] = {
                        field,
                        message: errors[field],
                    };
                    return acc;
                }, {});
            }
            throw {
                success: false,
                message: 'Validation error occurred.',
                errorDetails: formattedErrorDetails,
            };
        }
        throw {
            success: false,
            message: error.message || 'Something went wrong.',
        };
    }
});
exports.registerAdmin = registerAdmin;
const registerTrainee = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingTrainee = yield trainee_model_1.default.findOne({ email });
        if (existingTrainee) {
            throw new Error('Trainee with this email already exists.');
        }
        const hashedPassword = password ? yield bcrypt_1.default.hash(password, SALT_ROUNDS) : undefined;
        const trainee = new trainee_model_1.default({ name, email, password: hashedPassword });
        yield trainee.save();
        return { message: 'Trainee registered successfully.' };
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            let formattedErrorDetails;
            const errorFields = Object.keys(errors);
            if (errorFields.length === 1) {
                const field = errorFields[0];
                formattedErrorDetails = {
                    field,
                    message: errors[field],
                };
            }
            else {
                formattedErrorDetails = errorFields.reduce((acc, field) => {
                    acc[field] = {
                        field,
                        message: errors[field],
                    };
                    return acc;
                }, {});
            }
            throw {
                success: false,
                message: 'Validation error occurred.',
                errorDetails: formattedErrorDetails,
            };
        }
        throw {
            success: false,
            message: error.message || 'Something went wrong.',
        };
    }
});
exports.registerTrainee = registerTrainee;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield trainer_model_1.default.findOne({ email });
        let role = constants_1.UserRole.TRAINER;
        if (!user) {
            user = yield trainee_model_1.default.findOne({ email });
            role = constants_1.UserRole.TRAINEE;
            if (!user) {
                throw {
                    success: false,
                    message: 'Invalid credentials.',
                };
            }
        }
        if (user.password && password) {
            const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordMatch) {
                throw {
                    success: false,
                    message: 'Invalid credentials.',
                };
            }
        }
        else if (user.password && !password) {
            throw {
                success: false,
                message: 'Password is required.',
                errorDetails: {
                    field: 'password',
                    message: 'Password must be provided.',
                },
            };
        }
        const tokenPayload = { id: user._id, role: user.role || role };
        const token = (0, jwt_1.generateToken)(tokenPayload);
        return {
            token,
            role,
            userId: user._id,
        };
    }
    catch (error) {
        if (error.success === false) {
            throw error;
        }
        throw {
            success: false,
            message: error.message || 'Login failed.',
        };
    }
});
exports.login = login;
