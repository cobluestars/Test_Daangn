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
const posts_1 = require("../../lib/posts");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, category } = req.query;
        // page 쿼리 파라미터가 없거나 숫자가 아닌 경우 기본값으로 1을 사용
        const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
        try {
            if (req.method === 'POST') {
                //게시글 생성
                const { title, content, category } = req.body;
                yield (0, posts_1.createPost)(title, content, category);
                res.status(201).json({ message: '게시글 생성 완료: Create Post' });
            }
            else if (req.method === 'GET' && id) {
                //게시글 조회
                const post = yield (0, posts_1.getPost)(id);
                if (!post) {
                    res.status(404).json({ message: '게시글을 찾을 수 없습니다: Not found Post' });
                    return;
                }
                yield (0, posts_1.incrementPostViews)(id);
                res.status(200).json(post);
            }
            else if (req.method === 'GET' && category) {
                // 카테고리 필터링 및 페이지네이션을 사용한 게시글 목록 조회
                const pageSize = 10; //한 페이지 내의 게시글 수
                const postsPage = yield (0, posts_1.getPostsByCategoryAndPage)(category, page, pageSize);
                res.status(200).json(postsPage);
            }
            else if (req.method === 'PUT' && id) {
                //게시글 업데이트
                const { title, content, category } = req.body;
                yield (0, posts_1.updatePost)(id, title, content, category);
                res.status(200).json({ message: '게시글 업데이트 완료: Update Post' });
            }
            else if (req.method === 'DELETE' && id) {
                //게시글 삭제
                yield (0, posts_1.deletePost)(id);
                res.status(200).json({ message: '게시글 삭제 완료: Delete Post' });
            }
            else if (req.method === 'GET' && req.query.keyword) {
                //게시글 검색
                const keyword = req.query.keyword;
                const items = yield (0, posts_1.searchPosts)(keyword);
                res.status(200).json(items);
            }
            else {
                res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                //오류가 Error 인스턴스인 경우
                res.status(500).json({ message: `서버 오류: ${error.message}` });
            }
            else {
                //오류 타입이 불명확한 경우
                res.status(500).json({ message: '서버 오류: Server Error' });
            }
        }
    });
}
exports.default = handler;
