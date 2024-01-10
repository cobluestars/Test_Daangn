// /src/pages/api/check-peak-time.ts
// bigquery로부터 피크 타임 정보를 받아서, 클라이언트단에 피크 타임을 알려주고 추천 게시글이 나오도록 도와줌

import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAndRecommendPosts } from '../../lib/bigquery';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const recommendationData = await checkAndRecommendPosts();
      res.status(200).json(recommendationData);
    } catch (error) {
      res.status(500).json({ message: '서버 에러가 발생했습니다.', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}