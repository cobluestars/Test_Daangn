// /src/lib/bigquery.ts

import { BigQuery } from "@google-cloud/bigquery";

//BigQuery 클라이언트를 초기화
const BigQueryClient = new BigQuery();

//추천 게시글을 결정하기 위한 기준값 설정
const thresholdMultiplier = 1.5;
let peakHoursThreshold = 1600;

//현재 시간을 확인, peakHoursThreshold 기준으로 추천 게시글을 결정
export const checkAndRecommendPosts =async () => {
    // UTC 시간을 가져온 후, 9시간(한국 시간대)을 더함
    const now = new Date();
    const koreaTimeOffset = 9 * 60; // 9 hours in minutes
    const kstDate = new Date(now.getTime() + koreaTimeOffset * 60 * 1000);

    // 현재 시간을 HH 형식으로 변환
    const currentHourOnly = kstDate.toISOString().slice(11, 13);

    // 로그로 현재 시간 출력
    console.log("쿼리에 사용될 현재 시간(Hour only, KST):", currentHourOnly);

    // 현재 시간대의 타임스탬프 생성 수를 BigQuery에서 쿼리함
    const options = {
        query: `
            SELECT hour, count
            FROM dataherd_step3.dataherd_timestamp
            WHERE hour LIKE '%${currentHourOnly}';
        `,
        location: 'asia-northeast3',
        params: { currentHour: `${currentHourOnly}` }
    };


    try {
        // 쿼리를 실행하고 결과를 가져옴
        const[job] = await BigQueryClient.createQueryJob(options);
        const[rows] = await job.getQueryResults();

        //추천 게시글을 결정
        if (rows.length > 0 && rows[0].count >= peakHoursThreshold * thresholdMultiplier) {

            //클라이언트에 반환될 데이터 설정
            const recommendationData = {
                isPeakTime: true,
                message: '피크 타임입니다! 식당 및 카페를 체크해보세요!',
                now: kstDate
            };

            //추천 데이터를 클라이언트로 보냄
            return recommendationData;
        } else {
            return { isPeakTime: false }
        }
    } catch (e) {
        console.error('Error querying BigQuery', e);
        throw e;
    }
}