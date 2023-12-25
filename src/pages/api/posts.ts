// /src/pages/api/posts.ts

/** API 라우트 */
import { NextApiRequest, NextApiResponse } from 'next';
import { createPost, getAllPosts, getPostsByCategoryAndPage, searchPosts } from '../../lib/posts'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { category } = req.query;
        
    try {
        if (req.method === 'POST') {
            //게시글 생성
            const { title, content, category } = req.body;
            const postId = await createPost(title, content, category);
            res.status(201).json({ message: '게시글 생성 완료: Create Post', id: postId });// 게시글 id 포함하여 반환
        } else if (req.method === 'GET') {
            const categoryValue = Array.isArray(category) ? category[0] : category;
        
            if (!categoryValue || categoryValue.trim() === '') {
                // category가 빈 문자열일 경우 모든 게시물 반환
                const allPosts = await getAllPosts();
                res.status(200).json(allPosts);
            } else {
                // 특정 카테고리의 게시물 반환
                const postsPage = await getPostsByCategoryAndPage(categoryValue);
                res.status(200).json(postsPage);
            }
        } else if (req.method === 'GET' && req.query.keyword) {
            //게시글 검색
            console.log('Searching posts with keyword:', req.query.keyword); // 키워드로 게시글 검색 로깅
            const keyword = req.query.keyword as string;
            const items = await searchPosts(keyword);
            res.status(200).json(items);
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