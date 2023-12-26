// /src/lib/posts.ts

import dynamoDb from "./dynamoDB";
import { v4 as uuidv4 } from 'uuid';

// 게시글 생성
export const createPost = async (title: string, content: string, category: string) => {
    const id = uuidv4();
    const params = {
        TableName: 'PostsTable',
        Item: {
            id: id,
            title,
            content,
            category,
            views: 0,
            createdAt: new Date().toISOString()
        }
    };
    try {
       await dynamoDb.put(params).promise();
       return id; //생성된 게시글의 id 반환
    } catch (error) {
        console.error(error);
        throw new Error('게시글 생성 중 에러 발생: Error creating post');
    }
};

// 모든 게시물을 조회하는 함수
export const getAllPosts = async () => {
    const params = {
        TableName: 'PostsTable',
        // 추가적인 조건 없이 모든 데이터를 조회
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return {
            items: result.Items
        };
    } catch (error) {
        console.error(error);
        throw new Error('게시글 조회 중 에러 발생: Error fetching all posts');
    }
};

// 특정 게시글 조회 및 조회수 업데이트
export const getPost = async (id: string) => {
    const getParams = {
        TableName: 'PostsTable',
        Key: { id }
    };
    
    try {
        const result = await dynamoDb.get(getParams).promise();
        if(result.Item) {
            //조회수 업데이트 로직
            return result.Item;
        } else {
            return null;
        }
    } catch(error) {
        console.error(error);
        throw new Error('게시글 조회 중 에러 발생: Error fetching post')
    }
};

//카테고리별 게시글 가져오기 / 페이징 (추후 구현)
export const getPostsByCategoryAndPage = async (
    category: string
) => {
    const params = {
        TableName: 'PostsTable',
        IndexName: 'category-index', // 카테고리에 따른 글로벌 보조 인덱스(GSI)
        KeyConditionExpression: 'category = :category',
        ExpressionAttributeValues: {
            ':category': category,
        },
        ScanIndexForward: true // 결과를 오름차순으로 정렬
    };

    try {
        const result = await dynamoDb.query(params).promise();
        return {
            items: result.Items,
            // LastEvaluatedKey를 제거, 간단한 조회 기능만 구현
        };
    } catch (error) {
        console.error(error);
        throw new Error('카테고리별 게시글 조회 중 에러 발생: Error fetching posts by category');
    }
};

// 조회수 업데이트
export const incrementPostViews = async (id: string) => {
    const updateviewsParams = {
        TableName: 'PostsTable',
        Key: { id },
        UpdateExpression: 'set #views = #views + :val',
        ExpressionAttributeNames: {
            '#views': 'views' //views라는 실제 속성 이름을 '#views'라는 별칭으로 매핑
        },
        ExpressionAttributeValues: {
            ':val': 1
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        await dynamoDb.update(updateviewsParams).promise();
    } catch (error) {
        console.error(error);
        throw new Error('조회수 업데이트 중 에러 발생: Error updating views')
    }
};

// 게시글 업데이트
export const updatePost = async (id: string, title: string, content: string) => {
    const params = {
        TableName: 'PostsTable',
        Key: { id },
        UpdateExpression: 'set title = :title, content = :content',
        ExpressionAttributeValues: {
            ':title': title,
            ':content': content
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try{
    await dynamoDb.update(params).promise();
    } catch(error) {
        console.error(error);
        throw new Error('게시글 업데이트 중 에러 발생: Error updating post')
    }
};

// 게시글 삭제
export const deletePost = async (id: string) => {
    const params = {
        TableName: 'PostsTable',
        Key: { id }
    };
    try{
    await dynamoDb.delete(params).promise();
    } catch(error) {
        console.error(error);
        throw new Error('게시글 삭제 중 에러 발생: Error deleting post')
    }
};

// 게시글 검색
/** (만일 사용자 이벤트 데이터뿐만 아니라 posts도 대규모 데이터셋을 이용할 시,
 *  'scan'은 테이블 전체를 스캔하므로 성능 저하 우려.
 *  이 때 'scan' 대신, 글로벌 보조 인덱스(GSI)와 함께 'query' 연산 사용) */

export const searchPosts = async (keyword: string) => {
    const params = {
        TableName: 'PostsTable',
        FilterExpression: 'contains(title, :keyword) or contains(content, :keyword)',
        ExpressionAttributeValues: {
            ':keyword': keyword
        }
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return {
            items: result.Items
            // LastEvaluatedKey를 제거, 간단한 조회 기능만 구현
        };
    } catch (error) {
        console.error(error);
        throw new Error('게시글 검색 중 에러 발생: Error searching posts')       
    }
}