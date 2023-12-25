// components/CreatePostForm.tsx
import React, { useState } from 'react';

interface CreatePostFormProps {
    onSuccess: (postId: string) => void;  //onSuccess props 타입
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSuccess }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, category })
        });

        if (response.ok) {
            const data = await response.json();
            const createdPostId = data.id;  //생성된 게시글의 ID를 받아 옴

            // 게시글 생성 후 처리
            setTitle('');
            setContent('');
            setCategory('');
            setMessage('Create Post Successful');

            onSuccess(createdPostId);   //게시글 생성 성공 이후, 생성된 게시글 id와 함께 onSuccess콜백 호출
        } else {
            setMessage('Create Post Fail')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
            <br />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" />
            <br />
            <select aria-label='카테고리' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">전체</option>
                <option value="음식점">음식점</option>
                <option value="카페">카페</option>
                <option value="과외">과외</option>
                <option value="청소">청소</option>
                <option value="심부름">심부름</option>
            </select>
            <br />
            <button type="submit">게시글 생성</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default CreatePostForm;