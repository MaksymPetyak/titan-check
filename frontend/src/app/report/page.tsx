'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { ReportOverview } from '../types/report';
import { Loader2 } from 'lucide-react';
import { Report } from '~/components/ui/Report';

interface ApiError {
    error: string;
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
                const response = await fetch('/api/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                const data = await response.json() as ReportOverview | ApiError;

                if (!response.ok) {
                    const errorMessage = 'error' in data ? data.error : 'Failed to fetch report';
                    throw new Error(errorMessage);
                }

                if ('error' in data) {
                    throw new Error(data.error);
                }

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
        return (
            <div className="flex-grow flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
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
