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
        <div className="marketplace-container">
            <header className="marketplace-header">
                <h1>🦊여우마켓🦊</h1>
                <Link href="/create-post">
                    <button className="create-post-btn">게시글 작성</button>
                </Link>
            </header>
            
            <div className="search-container">
                <select className="category-select" aria-label='카테고리' onChange={(e) => setCategory(e.target.value)}>
                    <option value="">전체</option>
                    <option value="음식점">음식점</option>
                    <option value="카페">카페</option>
                    <option value="과외">과외</option>
                    <option value="청소">청소</option>
                    <option value="심부름">심부름</option>
                </select>

                <input 
                    type="text" 
                    className="search-input"
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                    placeholder="검색어 입력" 
                />
                <button className="search-btn" onClick={handleSearch}>검색</button>
            </div>

            <ul className="posts-list">
                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <Link href={`/posts/${post.id}`}>
                            <h5>【{post.category}】 {post.title} 작성일: {post.createdAt} 조회수: {post.views}</h5>
                        </Link>
                    </li>
                ))}
            </ul>

            <style>
                {`
                .marketplace-container {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .marketplace-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .create-post-btn {
                    background-color: #ff8a00;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .search-container {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .category-select, .search-input {
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }

                .search-btn {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .posts-list {
                    list-style: none;
                    padding: 0;
                }

                .post-item {
                    background-color: #f9f9f9;
                    border: 1px solid #eee;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }

                .post-item h5 {
                    margin: 0;
                    color: #333;
                }
                `}
            </style>
        </div>
    );
};

export default IndexPage;