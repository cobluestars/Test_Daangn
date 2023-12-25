//pages/create-post.tsx

import React from 'react';
import CreatePostForm from '../components/CreatePostForm';
import { useRouter } from 'next/router';

const CreatePostPage = () => {
    const router = useRouter();

    return (
        <div>
            <h1>게시글 생성</h1>
            <CreatePostForm onSuccess={() => router.push('/')} />
        </div>
    );
};

export default CreatePostPage;