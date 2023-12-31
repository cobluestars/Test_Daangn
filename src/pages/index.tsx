// /src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import {
    trackClickEvent,
    trackKeywordEvent,
    setGlobalUserDefinedItems,
    setLocalCustomDataGroup,
    setUserClickCount,
    setUserKeywordCount,
    UserDefinedItem,
    KeywordEventData,
    getRandomTimestamp,
    ClickEventData,
    initializeTimestampSettings,
    setShotgunMode,
} from 'dataherd-raika';

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
        // // 구) 시간 범위 설정
        // setTimestampRange(new Date('2024-01-02T00:00:00'), new Date('2024-01-02T08:00:00'));
    
        /**개선된 시간 설정 */
        // TimestampSettings 객체 정의
        type TimestampSettings = {
            startTime: string;
            endTime: string;
            peakTimes?: string[][];
        };

        // TimestampSettings 객체 초기화
        const timestampSettings: TimestampSettings = {
            startTime: '2024-01-02T09:00:00',
            endTime: '2024-01-02T18:00:00',
            peakTimes: [
                ['2024-01-02T12:00:00', '2024-01-02T13:00:00'],
                ['2024-01-02T17:00:00', '2024-01-02T18:00:00']
            ]
        };

        // 시간 설정 초기화 함수 호출
        initializeTimestampSettings(timestampSettings);

        // getRandomTimestamp 함수를 호출하여 테스트
        const timestamp = getRandomTimestamp();
        console.log(timestamp);
        /**개선된 시간 설정 */

        /** shotgun mode */
        // component가  마운트될 때 샷건 모드를 활성화하고, 3초 간격으로 이벤트를 실행하도록 설정
        // setShotgunMode(true, 0);

        // GlobalUserDefinedItems 정의 및 초기화
        const GlobalUserDefinedItems: UserDefinedItem[] = [
            {
                name: 'job',
                type: 'array',
                options:[
                            {
                                name: 'student',
                                type: 'array',
                                options: [
                                    {
                                        name: 'age',
                                        type: 'number',
                                        distribution: 'normal',
                                        mean: 20,
                                        options: [10, 30]
                                    },
                                    {
                                        name: 'salary',
                                        type: 'number',
                                        distribution: 'normal',
                                        mean: 12000,
                                        options: [10000, 20000]
                                    }
                                ]
                            },
                            {
                                name: 'developer',
                                type: 'array',
                                options: [
                                    {
                                        name: 'age',
                                        type: 'number',
                                        distribution: 'normal',
                                        mean: 40,
                                        options: [20, 60]
                                    },
                                    {
                                        name: 'salary',
                                        type: 'number',
                                        distribution: 'normal',
                                        mean: 40000,
                                        options: [20000, 100000]
                                    }
                                ]
                            },
                            {
                                name: 'accountant',
                                type: 'array',
                                options: [
                                    {
                                        name: 'age',
                                        type: 'number',
                                        distribution: 'normal',
                                        mean: 40,
                                        options: [20, 60]
                                    },
                                    {
                                        name: 'salary',
                                        type: 'number',
                                        distribution: 'normal',
                                        mean: 36000,
                                        options: [30000, 100000]
                                    }
                                ]
                            }
                        ],
                randomizeArrays: true,
                selectionProbability: true,
                probabilitySetting: [
                    { identifier: 0, probability: 6 },
                    { identifier: 1, probability: 47 },
                    { identifier: 2, probability: 47 },
                ],
                arraySelectionCount: 1,
            },
            {
                name: 'favorite drinks',
                type: 'array',
                options: ['Americano', 'Latte', 'Cappuccino', 'Green Tea Latte'],
                randomizeArrays: true
            },
            {
                name: 'hobbies',
                type: 'object',
                options: { hobby1: 'reading', hobby2: 'gaming', hobby3: 'coding', hobby4: 'hiking' },
                randomizeObjects: true,
                objectSelectionCount: 3,
                randomizeSelectionCount: true   
            },
            {
                name: 'cache-data',
                type: 'object',
                cacheSettings: {
                    enableCacheSimulation: false,
                    simulatedCacheSize: 0, // 1MB의 무의미한 텍스트 캐시 데이터
                    simulatedDelay: 0 // 0ms 지연
                }
            }
        ];

        // 설정한 GlobalUserDefinedItems를 사용
        setGlobalUserDefinedItems(GlobalUserDefinedItems);

        // 클릭 및 키워드 이벤트 카운트 설정
        setUserClickCount(1000);
        setUserKeywordCount(1000);

        //초기 카테고리 데이터 로드
        fetchPosts();
    }, []);

    //키워드 이벤트를 서버로 보내기 위한 콜백 함수 정의
    const sendKeywordEventToServer = async (eventData: { [key: string]: KeywordEventData }) => {
        try {
            await fetch('/api/save-event-data', {
                method: 'POST',
                body: JSON.stringify(eventData),
                headers: {'Content-Type': 'application/json'}
            });
        } catch (error) {
            console.error('Error sending eventdata', error);
        }       
    }

    //클릭 이벤트를 서버로 보내기 위한 콜백 함수 정의
    const sendClickEventToServer = async (eventData: { [key: string]: ClickEventData }) => {
        try {
            await fetch('/api/save-event-data', {
                method: 'POST',
                body: JSON.stringify(eventData),
                headers: {'Content-Type': 'application/json'}
            });
        } catch (error) {
            console.error('Error sending eventdata', error);
        }       
    }

    const handlePostClick = (e: React.MouseEvent<HTMLLIElement>) => {
        //게시글 클릭 이벤트 추적
        trackClickEvent(e.nativeEvent, 'postClick', false, true, sendClickEventToServer);
    };
    
    // 카테고리 선택 시 로컬 데이터 설정 및 이벤트 추적
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        //카테고리에 따른 로컬 데이터 항목 설정
        let localDataItem: UserDefinedItem | null = null;   //localDataItem의 타입을 UserDefinedItem으로 명시
        switch (selectedCategory) {
            case "음식점":
                localDataItem = { name: 'category', type: 'string', options: 'restaurant' };
                break;
            case "카페":
                localDataItem = { name: 'category', type: 'string', options: 'cafe' };
                break;
            case "과외":
                localDataItem = { name: 'category', type: 'string', options: 'tutor' };
                break;
            case "청소":
                localDataItem = { name: 'category', type: 'string', options: 'cleaning' };
                break;
            case "심부름":
                localDataItem = { name: 'category', type: 'string', options: 'errand' };
                break;
            default:
                localDataItem = null;
        }

        if (localDataItem) {
            setLocalCustomDataGroup('categoryChange', [localDataItem]);
            //카테고리 선택 시 이벤트 추적
            trackClickEvent(e.nativeEvent, 'categoryChange', true, true, sendClickEventToServer);
        }
    };

    const handleCreatePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // 로컬 사용자 정의 데이터 설정
        setLocalCustomDataGroup( 'Add Local Business button', [ 
           { name: 'Add Local Business', type: 'string', options: 'Add Local Business' }
        ]);

        // 클릭 이벤트 추적
        trackClickEvent(e as unknown as Event, 'Add Local Business button', true, false);
    };

    const fetchPosts = async () => {
        const response = await fetch(`/api/posts?category=${category}`);
        const data = await response.json();
        setPosts(data.items || []);
    };

    useEffect(()  => {
        fetchPosts();
    }, [category]);

    const handleSearch = async () => {
        console.log("Searching for:", keyword);
        //키워드 검색 이벤트 추적
        trackKeywordEvent(keyword, 'search', true, true, 1, sendKeywordEventToServer);

        try {
            const response = await fetch(`/api/posts?keyword=${keyword}`);
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
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
                    <button className="create-post-btn" onClick={handleCreatePostClick}>게시글 작성</button>
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
                    <li key={post.id} className="post-item" onClick={handlePostClick}>
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