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
exports.updateTask = exports.getTaskById = exports.getAllTodo = exports.deleteTodo = exports.createTodo = void 0;
const todo_1 = require("../model/todo");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.createTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const response = yield todo_1.Todo.create({
            title
        });
        res.status(201).json({ message: "New Todo sucessfully created", response });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}));
exports.deleteTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        if (!title) {
            res.status(404).json({ message: "title is required" });
        }
        yield todo_1.Todo.findOneAndDelete({ title: title.toLowerCase() });
        res.status(200).json({ message: `${title} is deleted` });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}));
exports.getAllTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield todo_1.Todo.find({});
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}));
exports.getTaskById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield todo_1.Todo.findById(id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ data: task });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}));
exports.updateTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const { id } = req.params;
    try {
        const updateTask = yield todo_1.Todo.findByIdAndUpdate(id, { title });
        res.status(200).json({ message: "Task updated successfully", updateTask });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}));
