// /src/pages/api/posts.ts

/** API 라우트 */
import { NextApiRequest, NextApiResponse } from 'next';
import { createPost, getAllPosts, getPostsByCategoryAndPage, searchPosts } from '../../lib/posts'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
        
    try {
        if (req.method === 'POST') {
            //게시글 생성
            const { title, content, category } = req.body;
            const postId = await createPost(title, content, category);
            res.status(201).json({ message: '게시글 생성 완료: Create Post', id: postId });// 게시글 id 포함하여 반환
        } else if (req.method === 'GET') {
            //게시글 조회
            const { category, keyword } = req.query;
            const categoryValue = Array.isArray(category) ? category[0] : category;

            if (keyword) {
                // 키워드로 게시글 검색
                const postsByKeyword = await searchPosts(keyword as string);
                res.status(200).json(postsByKeyword);
            } else if (categoryValue) {
                // 카테고리별 게시물 반환
                const postsByCategory = await getPostsByCategoryAndPage(categoryValue);
                res.status(200).json(postsByCategory);
            } else {
                // 모든 게시물 반환
                const allPosts = await getAllPosts();
                res.status(200).json(allPosts);
            }
        } else {
            console.log('Method not allowed for this request:', req.method);
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        if (error instanceof Error) {
            //오류가 Error 인스턴스인 경우
            res.status(500).json({ message: `서버 오류: ${error.message}`});
        } else {
            //오류 타입이 불명확한 경우
            res.status(500).json({ message: '서버 오류: Server Error'});
        }
    }
}