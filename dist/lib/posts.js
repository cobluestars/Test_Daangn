"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPosts = exports.deletePost = exports.updatePost = exports.incrementPostViews = exports.getPostsByCategoryAndPage = exports.getPost = exports.createPost = void 0;
const dynamoDB_1 = require("./dynamoDB");
const uuid_1 = require("uuid");
// 게시글 생성
const createPost = (title, content, category) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'PostsTable',
        Item: {
            id: (0, uuid_1.v4)(),
            title,
            content,
            category,
            views: 0,
            createdAt: new Date().toISOString()
        }
    };
    try {
        yield dynamoDB_1.default.put(params).promise();
    }
    catch (error) {
        console.error(error);
        throw new Error('게시글 생성 중 에러 발생: Error creating post');
    }
});
exports.createPost = createPost;
// 게시글 조회
const getPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getParams = {
        TableName: 'PostsTable',
        Key: { id }
    };
    try {
        const result = yield dynamoDB_1.default.get(getParams).promise();
        return result.Item;
    }
    catch (error) {
        console.error(error);
        throw new Error('게시글 조회 중 에러 발생: Error getting posts');
    }
});
exports.getPost = getPost;
//카테고리별 게시글 가져오기 & 페이징
const getPostsByCategoryAndPage = (category, lastEvaluatedKey, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'PostsTable',
        IndexName: 'CategoryIndex', //카테고리에 따른 글로벌 보조 인덱스(GSI)
        KeyConditionExpression: 'category = :category',
        ExpressionAttributeValues: {
            ':category': category,
        },
        Limit: pageSize,
        ScanIndexForward: true // 결과를 오름차순으로 정렬
    };
    if (lastEvaluatedKey) { //lastEvaluateKey가 존재하는 겨웅에만 ExclusiveStartKey를 params 객체에 추가함.
        params.ExclusiveStartKey = lastEvaluatedKey; //페이지네이션을 위한 시작 키
    }
    try {
        const result = yield dynamoDB_1.default.query(params).promise();
        return {
            items: result.Items,
            lastEvgaluatedKey: result.LastEvaluatedKey //다음 페이지를 위한 키
        };
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching posts by category and page');
    }
});
exports.getPostsByCategoryAndPage = getPostsByCategoryAndPage;
// 조회수 업데이트
const incrementPostViews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateviewsParams = {
        TableName: 'PostsTable',
        Key: { id },
        UpdateExpression: 'set views = views + :val',
        ExpressionAttributeValues: {
            ':val': 1
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        yield dynamoDB_1.default.update(updateviewsParams).promise();
    }
    catch (error) {
        console.error(error);
        throw new Error('조회수 업데이트 중 에러 발생: Error updating views');
    }
});
exports.incrementPostViews = incrementPostViews;
// 게시글 업데이트
const updatePost = (id, title, content, category) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'PostsTable',
        Key: { id },
        UpdateExpression: 'set title = :title, content = :content, category = :category',
        ExpressionAttributeValues: {
            ':title': title,
            ':content': content,
            ':category': category
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        yield dynamoDB_1.default.update(params).promise();
    }
    catch (error) {
        console.error(error);
        throw new Error('게시글 업데이트 중 에러 발생: Error updating post');
    }
});
exports.updatePost = updatePost;
// 게시글 삭제
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'PostsTable',
        Key: { id }
    };
    try {
        yield dynamoDB_1.default.delete(params).promise();
    }
    catch (error) {
        console.error(error);
        throw new Error('게시글 삭제 중 에러 발생: Error deleting post');
    }
});
exports.deletePost = deletePost;
// 게시글 검색
/** (만일 사용자 이벤트 데이터뿐만 아니라 posts도 대규모 데이터셋을 이용할 시,
 *  'scan'은 테이블 전체를 스캔하므로 성능 저하 우려.
 *  이 때 'scan' 대신, 글로벌 보조 인덱스(GSI)와 함께 'query' 연산 사용) */
const searchPosts = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'PostsTable',
        FilterExpression: 'contains(title, :keyword) or contains(content, :keyword)',
        ExpressionAttributeValues: {
            ':keyword': keyword
        }
    };
    try {
        const result = yield dynamoDB_1.default.scan(params).promise();
        return result.Items;
    }
    catch (error) {
        console.error(error);
        throw new Error('게시글 검색 중 에러 발생: Error searching posts');
    }
});
exports.searchPosts = searchPosts;
