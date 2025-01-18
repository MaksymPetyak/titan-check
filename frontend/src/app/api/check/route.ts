import { NextResponse } from 'next/server';
import type { ReportOverview } from '~/app/types/report';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

interface CheckRequest {
    query: string;
}

export async function POST(request: Request) {
    try {
        const body = await request.json() as CheckRequest;
        console.log('Sending request to Flask backend:', { url: `${API_URL}/api/check`, body });

        const response = await fetch(`${API_URL}/api/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Flask API error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json() as ReportOverview;
        console.log('Received response from Flask:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to process request' },
            { status: 500 }
        );
    }
} 