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
exports.updateProfile = exports.userProfile = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_1 = require("../model/user");
const token_1 = __importDefault(require("../utils/token"));
const asyncHandler_1 = require("../utils/asyncHandler");
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error("Email is already existed");
        }
        const user = yield user_1.User.create({
            name,
            email,
            password
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        }
    }
    catch (error) {
        res.status(500);
        throw new Error("Something wrong at registeration");
    }
}));
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existedUser = yield user_1.User.findOne({ email });
    if (existedUser && (yield existedUser.matchPassword(password))) {
        (0, token_1.default)(res, existedUser._id);
        res.status(200).json({
            _id: existedUser._id,
            name: existedUser.name,
            email: existedUser.email
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
}));
exports.logoutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "User logout successfully" });
}));
// export const userProfile = asyncHandler(async(req: AuthRequest, res: Response)=>{
//     const user = {
//         _id: req.user?._id,
//         name: req.user?.name,
//         email: req.user?.email
//     }
//     res.status(200).json({user})
// })
// export const updateProfile = asyncHandler(async(req: AuthRequest, res: Response)=>{
//     const user = await User.findById(req.user?._id)
//     if(!user){
//         res.status(404)
//         throw new Error("No user found")
//     }
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     user.password = req.body.password || user.password
//     const updateUser = await user.save()
//     const selectedUser = {
//         _id: updateUser._id,
//         name: updateUser.name,
//         email: updateUser.email
//     }
//     res.status(200).json({selectedUser})
// })
exports.userProfile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = {
        _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name,
        email: (_c = req.user) === null || _c === void 0 ? void 0 : _c.email,
    };
    res.status(200).json(user);
}));
exports.updateProfile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = yield user.save();
    const selectedUser = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    };
    res.status(200).json(selectedUser);
}));
