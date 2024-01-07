// /src/pages/api/save-event-data.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { PubSub } from '@google-cloud/pubsub';

type EventData = {
    eventType: string;
    timestamp: string;
    clickCount: number;
    keywordCount: number;
    repeatCount: number;
};

const pubSubClient = new PubSub();
const topicName = 'dataherd-step1';// Google Cloud Pub/Sub 토픽(주제) 이름

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const eventData: EventData = req.body;
    const filePath = path.join(process.cwd(), 'db.json');

    //db.json에 데이터 저장
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading data' });
        }

        // 기존 데이터를 객체 형태로 처리
        const existingData = data ? JSON.parse(data) : {};
        const eventId = eventData.timestamp;  // 고유 식별자로 timestamp 사용 (변경 가능)
        
        // 새로운 이벤트 데이터 추가
        existingData[eventId] = eventData;

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error saving data' });
            }
        });
    });

    //db.json과 동시에, Google Cloud Pub/Sub에 데이터 전송
    const dataBuffer = Buffer.from(JSON.stringify(eventData));
    pubSubClient.topic(topicName).publish(dataBuffer)
        .then(messageId => {
            console.log(`Message ${messageId} published.`);
            res.status(200).json({ message: 'Data saved and published sucessfully.' });
        })
        .catch(err => {
            console.error('Error publishing to Pub/Sub:', err);
            res.status(500).json({ message: 'Error publishing data' });
        });
}
