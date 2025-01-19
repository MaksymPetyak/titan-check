import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { GoogleSearchResponse } from '~/app/types/report';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip";

interface GoogleSearchCardProps {
    data: GoogleSearchResponse;
}

export const GoogleSearchCard: React.FC<GoogleSearchCardProps> = ({ data }) => {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle className="text-slate-800 font-medium">Web Presence Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-slate-700">
                            {data.query}
                        </p>
                        {/* Summary Section */}
                        <div className="text-sm text-muted-foreground">
                            {data.summary}
                        </div>
                    </div>

                    {/* Sources Section */}
                    <div className="border-t pt-3 mt-4">
                        <span className="text-xs text-slate-600">Sources: </span>
                        <div className="inline-flex flex-wrap gap-1.5">
                            {data.results.map((result, index) => (
                                <TooltipProvider key={index}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href={result.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
                                            >
                                                [{index + 1}]
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-sm">
                                            <div className="space-y-1">
                                                <p className="font-medium text-sm">{result.title}</p>
                                                <p className="text-xs text-muted-foreground">{result.snippet}</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}; 