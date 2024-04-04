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
exports.EmailLib = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailLib {
    static sendEmail(to, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailTransport = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    host: "smtpout.secureserver.net",
                    secure: true,
                    tls: { ciphers: "SSLv3" },
                    requireTLS: true,
                    port: 465,
                    debug: false,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    }
                });
                const mailOptions = {
                    from: process.env.EMAIL,
                    to,
                    subject,
                    html: body,
                };
                yield mailTransport.sendMail(mailOptions);
            }
            catch (error) {
                return;
            }
        });
    }
}
exports.EmailLib = EmailLib;
//# sourceMappingURL=email.js.map