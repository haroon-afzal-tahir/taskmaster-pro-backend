"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const ALLOWED_ORIGINS = [
    "http://localhost:5173",
];
exports.corsOptions = {
    origin: function (origin, callback) {
        if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
//# sourceMappingURL=corsOptions.js.map