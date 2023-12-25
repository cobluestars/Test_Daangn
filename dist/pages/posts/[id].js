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
// pages/posts/[id].tsx
const react_1 = require("react");
const router_1 = require("next/router");
const PostPage = () => {
    const [post, setPost] = (0, react_1.useState)(null); //타입 Post | null 지정
    const [editing, setEditing] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)('');
    const [content, setContent] = (0, react_1.useState)('');
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    (0, react_1.useEffect)(() => {
        if (typeof id === 'string') { //id가 string타입일 때만 fetch 호출
            const fetchPost = () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield fetch('/api/posts/${id}');
                const data = yield response.json();
                if (data && typeof data === 'object') {
                    setPost(data); //data가 객체이면 post상태 업데이트
                    setTitle(data.title);
                    setContent(data.content);
                }
            });
            fetchPost();
        }
    }, [id]);
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        if (window.confirm('정말로 게시글을 삭제하겠습니까?')) {
            const response = yield fetch('/api/posts/${id}', { method: 'DELETE' });
            if (response.ok) {
                router.push('/'); //메인 페이지로 이동함
            }
            else {
                alert('게시물 삭제 실패');
            }
        }
    });
    const handleUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
        if (editing) {
            if (window.confirm('정말로 이 게시물을 수정하시겠습니까?')) {
                //수정 API 호출
                const response = yield fetch('/api/posts/${id}', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content })
                });
                if (response.ok) {
                    //수정 성공 시
                    setEditing(false); //수정 모드 종료함
                    const updatedPost = yield response.json();
                    setPost(updatedPost); //업데이트된 게시물 정보로 상태 업데이트
                }
                else {
                    //수정 실패 시
                    alert('게시물 수정 실패');
                }
            }
        }
        else {
            setEditing(true); //수정 모드
        }
    });
    if (!post)
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [editing ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { "aria-label": '\uC81C\uBAA9', value: title, onChange: (e) => setTitle(e.target.value) }), (0, jsx_runtime_1.jsx)("textarea", { "aria-label": '\uB0B4\uC6A9', value: content, onChange: (e) => setContent(e.target.value) })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", { children: post.title }), (0, jsx_runtime_1.jsx)("p", { children: post.content })] })), (0, jsx_runtime_1.jsxs)("h5", { children: ["\uC870\uD68C\uC218: ", post.views, " \uC791\uC131\uC77C: ", post.createdAt] }), editing ? ((0, jsx_runtime_1.jsx)("button", { onClick: handleUpdate, children: "\uC218\uC815 \uC644\uB8CC" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setEditing(true), children: "\uC218\uC815" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleDelete, children: "\uC0AD\uC81C" })] }))] }));
};
exports.default = PostPage;
