'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { ReportOverview } from '../types/report';
import { Loader2 } from 'lucide-react';
import { Report } from '~/components/ui/Report';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

interface ApiError {
    error: string;
}

const loadingMessages = [
    "Checking LinkedIn profile...",
    "Googling additional information...",
    "Checking email address...",
    "Scanning sanction lists...",
    "Verifying phone number...",
    "Analyzing web presence...",
    "Gathering insights..."
];

function LoadingSpinner() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((current) => {
                // Stop at the last message
                if (current < loadingMessages.length - 1) {
                    return current + 1;
                }
                clearInterval(interval);
                return current;
            });
        }, 2000); // Change message every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary text-gray-600" />
            <p className="text-lg text-muted-foreground animate-pulse">
                {loadingMessages[messageIndex]}
            </p>
        </div>
    );
}

function ReportContent() {
    const searchParams = useSearchParams();
    const [report, setReport] = useState<ReportOverview | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = searchParams.get('q');
        if (!query) {
            setError('No query provided');
            setLoading(false);
            return;
        }

        const fetchReport = async () => {
            try {
                console.log('Sending request with query:', query);
                const response = await fetch(`${API_URL}/api/check`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API returned ${response.status}: ${errorText}`);
                }

                const data = await response.json() as ReportOverview;
                console.log('Received report:', data);
                setReport(data);
            } catch (err) {
                console.error('Error fetching report:', err);
                setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        void fetchReport();
    }, [searchParams]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-muted-foreground">No results found</p>
            </div>
        );
    }

    return <Report report={report} />;
}

export default function ReportPage() {
    return (
        <Suspense
            fallback={
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            }
        >
            <ReportContent />
        </Suspense>
    );
}
