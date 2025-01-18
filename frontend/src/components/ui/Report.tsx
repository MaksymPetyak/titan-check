"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { AlertCircle, Mail, Linkedin, CheckCircle2, Building2 } from "lucide-react";
import { ReportOverview } from "~/app/types/report";

interface ReportProps {
    report: ReportOverview;
}

export function Report({ report }: ReportProps) {
    const getRiskColor = (isRisky: boolean) => {
        return isRisky ? "border-red-500/50" : "border-green-500/50";
    };

    const getScoreTextColor = (isRisky: boolean) => {
        return isRisky ? "text-red-700" : "text-green-700";
    };

    const hasNoSanctionMatches = report.sanction_check &&
        report.sanction_check.name_matches.length === 0 &&
        report.sanction_check.company_matches.length === 0;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-2 p-4">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-xl font-medium text-slate-900">
                            {report.extracted_info.name ?? 'Unknown Person'}
                        </h1>
                        <div className="flex flex-col gap-1">
                            {report.extracted_info.company && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    <span>{report.extracted_info.company}</span>
                                </div>
                            )}
                            {report.extracted_info.email && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{report.extracted_info.email}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sanctions Section */}
                {report.sanction_check && (
                    <Card className={`p-6 col-span-full ${hasNoSanctionMatches ? 'border-green-500/30' : 'border-red-500/30'} border-2`}>
                        <div className="flex items-center gap-2 mb-3">
                            {hasNoSanctionMatches ? (
                                <CheckCircle2 className="h-5 w-5 text-green-700" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-red-700" />
                            )}
                            <h2 className="font-medium">Sanction List Check</h2>
                        </div>
                        {hasNoSanctionMatches ? (
                            <p className="text-sm text-green-700">No matches found in sanction lists. This is a positive signal.</p>
                        ) : (
                            <div className="space-y-4">
                                {report.sanction_check.name_matches.map((match) => (
                                    <div key={match.Record_ID} className="space-y-2">
                                        <Badge variant="outline" className="border-red-500/30">
                                            Name Match: {match.Name}
                                        </Badge>
                                        <p className="text-sm">{match.Description}</p>
                                        {match.Country && (
                                            <p className="text-sm text-muted-foreground">Country: {match.Country}</p>
                                        )}
                                    </div>
                                ))}
                                {report.sanction_check.company_matches.map((match) => (
                                    <div key={match.Record_ID} className="space-y-2">
                                        <Badge variant="outline" className="border-red-500/30">
                                            Company Match: {match.Company}
                                        </Badge>
                                        <p className="text-sm">{match.Description}</p>
                                        {match.Country && (
                                            <p className="text-sm text-muted-foreground">Country: {match.Country}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                )}

                {/* LinkedIn Report */}
                {report.linkedin_profile && (
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Linkedin className="h-5 w-5 text-blue-600" />
                            <h2 className="font-medium">LinkedIn Profile</h2>
                            {report.linkedin_profile.is_verified && (
                                <Badge variant="outline" className="ml-auto border-green-500/50 text-green-700">
                                    Verified
                                </Badge>
                            )}
                        </div>
                        <div className="space-y-2">
                            <p className="font-medium">{report.linkedin_profile.name}</p>
                            <p className="text-sm text-muted-foreground">{report.linkedin_profile.headline}</p>
                            {report.linkedin_profile.current_company && (
                                <p className="text-sm">Company: {report.linkedin_profile.current_company}</p>
                            )}
                            {report.linkedin_profile.location && (
                                <p className="text-sm">Location: {report.linkedin_profile.location}</p>
                            )}
                            {report.linkedin_profile.connections && (
                                <p className="text-sm">Connections: {report.linkedin_profile.connections}</p>
                            )}
                            {report.extracted_info.linkedin && (
                                <a
                                    href={report.extracted_info.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                                >
                                    View Profile →
                                </a>
                            )}
                        </div>
                    </Card>
                )}

                {/* Email Report */}
                {report.email_check && (
                    <Card className={`p-6 border-2 ${getRiskColor(report.email_check.is_disposable || !report.email_check.exists)}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="h-5 w-5" />
                            <h2 className="font-medium">Email Analysis</h2>
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className={getRiskColor(report.email_check.is_disposable)}>
                                    {report.email_check.is_disposable ? "Disposable Email" : "Not Disposable"}
                                </Badge>
                                <Badge variant="outline" className={getRiskColor(!report.email_check.exists)}>
                                    {report.email_check.exists ? "Exists" : "Does Not Exist"}
                                </Badge>
                                <Badge variant="outline" className={getRiskColor(report.email_check.is_private)}>
                                    {report.email_check.is_private ? "Private Email" : "Corporate Email"}
                                </Badge>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
