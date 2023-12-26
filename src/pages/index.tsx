// /src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Post = {
    id: string;
    category: string;
    title: string;
    views: number;
    createdAt: string;
}

const IndexPage = () => {
    const [posts, setPosts] = useState<Post[]>([]); //타입을 Post[]로 설정
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/posts?category=${category}`);
            const data = await response.json();
            setPosts(data.items || []);
        };
    
        fetchPosts();
    }, [category]);
    
    const handleSearch = async () => {
        console.log("Searching for:", keyword);
        try {
            const response = await fetch(`/api/posts?keyword=${keyword}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setPosts(data.items || []);
            } else {
                console.error('Failed to fetch posts:', response.status);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div>
            <h1>🦊여우마켓🦊</h1>

            <Link href="/create-post">
                <button>게시글 작성</button>
            </Link>

            <select aria-label='카테고리' onChange={(e) => setCategory(e.target.value)}>
                <option value="">전체</option>
                <option value="음식점">음식점</option>
                <option value="카페">카페</option>
                <option value="과외">과외</option>
                <option value="청소">청소</option>
                <option value="심부름">심부름</option>
            </select>

            <input 
                type="text" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="검색어 입력" 
            />
            <button onClick={handleSearch}>검색</button>

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                
                                    <h5>【{post.category}】 {post.title} 작성일: {post.createdAt} 조회수: {post.views}</h5>
                                                           
                            </Link>
                    </li>
                ))}
            </ul>

            {/* <button onClick={() => setPage(page - 1)}>이전</button>
            <button onClick={() => setPage(page + 1)}>다음</button> */}
        </div>
    );
};

export default IndexPage;