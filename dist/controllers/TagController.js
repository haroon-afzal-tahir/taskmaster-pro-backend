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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const models_1 = require("../models");
class TagController {
    static getTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tags = yield models_1.Tag.getAll();
                return res.status(200).json(tags);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.TagController = TagController;
//# sourceMappingURL=TagController.js.map