"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    static validateEmail(email) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    }
    static validateUsername(username) {
        // Username should be at least 3 characters long
        const regex = /^[a-zA-Z0-9]{3,}$/;
        return regex.test(username);
    }
}
exports.Validators = Validators;
//# sourceMappingURL=validator.js.map