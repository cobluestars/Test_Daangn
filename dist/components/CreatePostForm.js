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
const jsx_runtime_1 = require("react/jsx-runtime");
// components/CreatePostForm.tsx
const react_1 = require("react");
const CreatePostForm = () => {
    const [title, setTitle] = (0, react_1.useState)('');
    const [content, setContent] = (0, react_1.useState)('');
    const [category, setCategory] = (0, react_1.useState)('');
    const [message, setMessage] = (0, react_1.useState)('');
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const response = yield fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, category })
        });
        if (response.ok) {
            // 게시글 생성 후 처리
            setTitle('');
            setContent('');
            setCategory('');
            setMessage('Create Post Successful');
        }
        else {
            setMessage('Create Post Fail');
        }
    });
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "\uC81C\uBAA9" }), (0, jsx_runtime_1.jsx)("textarea", { value: content, onChange: (e) => setContent(e.target.value), placeholder: "\uB0B4\uC6A9" }), (0, jsx_runtime_1.jsxs)("select", { "aria-label": '\uCE74\uD14C\uACE0\uB9AC', value: category, onChange: (e) => setCategory(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\uC804\uCCB4" }), (0, jsx_runtime_1.jsx)("option", { value: "\uC74C\uC2DD\uC810", children: "\uC74C\uC2DD\uC810" }), (0, jsx_runtime_1.jsx)("option", { value: "\uCE74\uD398", children: "\uCE74\uD398" }), (0, jsx_runtime_1.jsx)("option", { value: "\uACFC\uC678", children: "\uACFC\uC678" }), (0, jsx_runtime_1.jsx)("option", { value: "\uCCAD\uC18C", children: "\uCCAD\uC18C" }), (0, jsx_runtime_1.jsx)("option", { value: "\uC2EC\uBD80\uB984", children: "\uC2EC\uBD80\uB984" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", children: "\uAC8C\uC2DC\uAE00 \uC0DD\uC131" })] }));
};
exports.default = CreatePostForm;
