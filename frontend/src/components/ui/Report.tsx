"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { AlertCircle, Mail, Phone, Linkedin, Instagram } from "lucide-react";
import { ReportOverview } from "~/app/types/report";

interface ReportProps {
    report: ReportOverview;
}

export function Report({ report }: ReportProps) {
    const getRiskColor = (score: number) => {
        if (score < 30) return "border-green-500/50";
        if (score < 70) return "border-yellow-500/50";
        return "border-red-500/50";
    };

    const getScoreTextColor = (score: number) => {
        if (score < 30) return "text-green-700";
        if (score < 70) return "text-yellow-700";
        return "text-red-700";
    };

    const name = report.query.split(',')[0];

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 p-6">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-medium text-slate-900">{name}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{report.explanation}</p>
                    </div>
                    <Badge
                        variant="outline"
                        className={`${getRiskColor(report.score)} ${getScoreTextColor(report.score)} border-2`}
                    >
                        Risk: {report.score}
                    </Badge>
                </div>
            </div>

            <Separator />

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Watchlists Section */}
                {report.atRiskDatabases.length > 0 && (
                    <Card className="p-6 col-span-full border-red-500/30 border-2">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="h-5 w-5 text-red-700" />
                            <h2 className="font-medium">Watchlist Matches</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {report.atRiskDatabases.map((db) => (
                                <Badge key={db} variant="outline" className="border-red-500/30">
                                    {db}
                                </Badge>
                            ))}
                        </div>
                    </Card>
                )}

                {/* LinkedIn Report */}
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                        <h2 className="font-medium">LinkedIn Profile</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            {report.linkedInReport.experience_summary}
                        </p>
                        <p className="text-sm">
                            Connections: <span className="font-medium">{report.linkedInReport.connections}</span>
                        </p>
                        <a
                            href={report.linkedInReport.linkedInUrl}
                            className="text-sm text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Profile →
                        </a>
                    </div>
                </Card>

                {/* Email Report */}
                <Card className={`p-6 border-2 ${getRiskColor(report.emailReport.score)}`}>
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="h-5 w-5" />
                        <h2 className="font-medium">Email Analysis</h2>
                        <Badge
                            variant="outline"
                            className={`ml-auto ${getRiskColor(report.emailReport.score)} ${getScoreTextColor(report.emailReport.score)} border-2`}
                        >
                            {report.emailReport.score}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium">{report.emailReport.summary}</p>
                        <p className="text-sm">{report.emailReport.explanation}</p>
                    </div>
                </Card>

                {/* Phone Report */}
                <Card className={`p-6 border-2 ${getRiskColor(report.phoneReport.score)}`}>
                    <div className="flex items-center gap-2 mb-4">
                        <Phone className="h-5 w-5" />
                        <h2 className="font-medium">Phone Number</h2>
                        <Badge
                            variant="outline"
                            className={`ml-auto ${getRiskColor(report.phoneReport.score)} ${getScoreTextColor(report.phoneReport.score)} border-2`}
                        >
                            {report.phoneReport.score}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium">{report.phoneReport.summary}</p>
                        <p className="text-sm">{report.phoneReport.explanation}</p>
                        <p className="text-sm font-mono">{report.phoneReport.phoneNumber}</p>
                    </div>
                </Card>

                {/* Instagram Report */}
                <Card className={`p-6 border-2 ${getRiskColor(report.instagramReport.score)}`}>
                    <div className="flex items-center gap-2 mb-4">
                        <Instagram className="h-5 w-5" />
                        <h2 className="font-medium">Instagram Presence</h2>
                        <Badge
                            variant="outline"
                            className={`ml-auto ${getRiskColor(report.instagramReport.score)} ${getScoreTextColor(report.instagramReport.score)} border-2`}
                        >
                            {report.instagramReport.score}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium">{report.instagramReport.summary}</p>
                        <p className="text-sm">{report.instagramReport.explanation}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
