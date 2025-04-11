"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.MAX_TRAINEES_PER_CLASS = exports.CLASS_DURATION_HOURS = exports.MAX_CLASSES_PER_DAY = void 0;
exports.MAX_CLASSES_PER_DAY = 5;
exports.CLASS_DURATION_HOURS = 2;
exports.MAX_TRAINEES_PER_CLASS = 10;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["TRAINER"] = "trainer";
    UserRole["TRAINEE"] = "trainee";
})(UserRole || (exports.UserRole = UserRole = {}));
