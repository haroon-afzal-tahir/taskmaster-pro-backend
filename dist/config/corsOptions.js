"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const ALLOWED_ORIGINS = [
    "https://taskmaster-pro-swart.vercel.app",
];
function getProfilecorsOrigin() {
    if (process.env.NODE_ENV !== 'production') {
        ALLOWED_ORIGINS.push('http://localhost:5173');
    }
    console.log("Allowed Origins: ", ALLOWED_ORIGINS);
    return ALLOWED_ORIGINS;
}
exports.corsOptions = {
    origin: getProfilecorsOrigin(),
    credentials: true
};
//# sourceMappingURL=corsOptions.js.map