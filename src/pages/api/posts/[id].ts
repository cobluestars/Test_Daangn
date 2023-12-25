// /pages/api/posts/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getPost, incrementPostViews, updatePost, deletePost } from '../../../lib/posts'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    
    try {
        if (req.method === 'GET' && id) {
            // 특정 게시글 조회 로직
            const post = await getPost(id as string);
            if (post) {
                await incrementPostViews(id as string);
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
            }        
        } else if (req.method === 'PUT' && id) {
            //게시글 업데이트
            const { title, content } = req.body;
            await updatePost(id as string, title, content);
            res.status(200).json({ message: '게시글 업데이트 완료: Update Post'});
        } else if (req.method === 'DELETE' && id) {
            //게시글 삭제
            await deletePost(id as string);
            res.status(200).json({ message: '게시글 삭제 완료: Delete Post'});
        } else {
            console.log('Method not allowed for this request:', req.method);
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
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