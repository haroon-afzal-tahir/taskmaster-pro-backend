"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const ALLOWED_ORIGINS = [
    "https://taskmaster-pro-swart.vercel.app",
];
if (process.env.NODE_ENV === "development") {
    ALLOWED_ORIGINS.push("http://localhost:5173");
}
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