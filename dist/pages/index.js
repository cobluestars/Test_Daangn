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
// pages/index.tsx
const react_1 = require("react");
const link_1 = require("next/link");
const IndexPage = () => {
    const [posts, setPosts] = (0, react_1.useState)([]); //타입을 Post[]로 설정
    const [category, setCategory] = (0, react_1.useState)('');
    const [page, setPage] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        const fetchPosts = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch(`/api/posts?category=${category}&page=${page}`);
            const data = yield response.json();
            setPosts(data.items || []);
        });
        fetchPosts();
    }, [category, page]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "\uD83E\uDD8A\uC5EC\uC6B0\uB9C8\uCF13\uD83E\uDD8A" }), (0, jsx_runtime_1.jsxs)("select", { "aria-label": '\uCE74\uD14C\uACE0\uB9AC', onChange: (e) => setCategory(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\uC804\uCCB4" }), (0, jsx_runtime_1.jsx)("option", { value: "\uC74C\uC2DD\uC810", children: "\uC74C\uC2DD\uC810" }), (0, jsx_runtime_1.jsx)("option", { value: "\uCE74\uD398", children: "\uCE74\uD398" }), (0, jsx_runtime_1.jsx)("option", { value: "\uACFC\uC678", children: "\uACFC\uC678" }), (0, jsx_runtime_1.jsx)("option", { value: "\uCCAD\uC18C", children: "\uCCAD\uC18C" }), (0, jsx_runtime_1.jsx)("option", { value: "\uC2EC\uBD80\uB984", children: "\uC2EC\uBD80\uB984" })] }), (0, jsx_runtime_1.jsx)("ul", { children: posts.map((post) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `/posts/${post.id}`, children: (0, jsx_runtime_1.jsx)("a", { children: (0, jsx_runtime_1.jsxs)("h5", { children: [post.title, " \uC870\uD68C\uC218: ", post.views, " \uC791\uC131\uC77C: ", post.createdAt] }) }) }) }, post.id))) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setPage(page - 1), children: "\uC774\uC804" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setPage(page + 1), children: "\uB2E4\uC74C" })] }));
};
exports.default = IndexPage;
