"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const trainer_routes_1 = __importDefault(require("./routes/trainer.routes"));
const trainee_routes_1 = __importDefault(require("./routes/trainee.routes"));
const schedule_routes_1 = __importDefault(require("./routes/schedule.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
const port = config_1.default.port;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/auth', auth_routes_1.default);
app.use('/trainers', trainer_routes_1.default);
app.use('/trainees', trainee_routes_1.default);
app.use('/schedules', schedule_routes_1.default);
// Error handling middleware
app.use(error_middleware_1.errorHandler);
// Connect to MongoDB
mongoose_1.default.connect(config_1.default.mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
