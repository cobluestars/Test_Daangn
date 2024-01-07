import { PubSub } from '@google-cloud/pubsub';

// 환경 변수에서 서비스 계정 키 경로를 읽습니다.
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Pub/Sub 클라이언트 초기화
const pubSubClient = new PubSub({ keyFilename });

export default pubSubClient;
