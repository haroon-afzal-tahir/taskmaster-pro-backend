"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Task = exports.Auth = void 0;
var Auth_1 = require("./Auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return Auth_1.router; } });
var Task_1 = require("./Task");
Object.defineProperty(exports, "Task", { enumerable: true, get: function () { return Task_1.router; } });
var Tag_1 = require("./Tag");
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return Tag_1.router; } });
