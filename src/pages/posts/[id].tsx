// /src/pages/posts/[id].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Post = {
    id: string;
    title: string;
    content: string;
    views: number;
    createdAt: string;
}

const PostPage = () => {
    const [post, setPost] = useState<Post | null>(null);    //타입 Post | null 지정
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        console.log(`Router query ID: ${id}`); // 1. 라우터의 id 값 확인

        if (typeof id === 'string') {
            const fetchPost = async (id: string) => {
                console.log(`Fetching post with ID: ${id}`); // 2. API 요청 URL 검증
                try {
                    const response = await fetch(`/api/posts/${id}`);
                    console.log(`Response status: ${response.status}, status text: ${response.statusText}`); // 응답 상태 확인

                    if (!response.ok) {
                        console.error(`서버로부터의 응답이 성공적이지 않음: 상태 코드 ${response.status}`); // 3. 서버 응답 확인
                        return;
                    }

                    console.log(`서버로부터 응답 받음: 상태 코드 ${response.status}`);
                
                    const data = await response.json();
                    console.log(`Received data:`, data); // 4. JSON 파싱 검증

                    if(data && typeof data === 'object' && !Array.isArray(data)) {
                        setPost(data);
                        setTitle(data.title);
                        setContent(data.content);
                    }
                } catch (error) {
                    console.error(`JSON 파싱 중 오류 발생:`, error); // JSON 파싱 에러 처리
                }
            };

            fetchPost(id);
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('정말로 게시글을 삭제하겠습니까?')) {
            const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (response.ok) {
                router.push('/')    //메인 페이지로 이동함
            } else {
                alert('게시물 삭제 실패');
            }
        }
    }
    
    const handleUpdate = async () => {
        if (editing) {
            if (window.confirm('정말로 이 게시물을 수정하시겠습니까?')) {
                //수정 API 호출
                const response = await fetch(`/api/posts/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content })
                });

                if (response.ok) {
                    //수정 성공 시
                    const updatedPost = await response.json();
                    setPost(updatedPost);   //업데이트된 게시물 정보로 상태 업데이트
                    setEditing(false);  //수정 모드 종료함

                    // 수정된 게시글의 상세 정보를 반영하기 위해 페이지 갱신
                    router.replace(router.asPath);
                } else {
                    //수정 실패 시
                    alert('게시물 수정 실패');
                }
            }
        } else {
            setEditing(true);   //수정 모드
        }
    };

    const GotoList = async () => {
        router.push('/')
    };

    if (!post) return <div>Loading...</div>;
    
    return (
        <div>
            {editing ? (
                <>
                    <input aria-label='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br />
                    <textarea aria-label='내용' value={content} onChange={(e) => setContent(e.target.value)} />
                    <br />
                </>
            ) : (
                <>
                    <h1>{post.title}</h1>
                    <br />
                    <p>{post.content}</p>
                    <br />
                </>
            )}
            <h5>조회수: {post.views} 작성일: {post.createdAt}</h5>

            {editing ? (
                <button onClick={handleUpdate}>수정 완료</button>
            ) : (
                <>
                    <button onClick={() => setEditing(true)}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </>
            )}

            <button onClick={GotoList}>목록</button>
        </div>
    );
};

export default PostPage;