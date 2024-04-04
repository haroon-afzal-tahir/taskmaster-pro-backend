"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tagSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
tagSchema.statics.getAll = function () {
    // Return all tags with the count of tasks associated with each tag
    return Tag.aggregate([
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "tag",
                as: "tasks",
            },
        },
        {
            $project: {
                name: 1,
                icon: 1,
                createdAt: 1,
                count: { $size: "$tasks" },
            },
        },
    ]);
};
tagSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});
const Tag = mongoose_1.default.model("Tag", tagSchema);
exports.default = Tag;
