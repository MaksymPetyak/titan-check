"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { SanctionCheckResult } from "~/app/types/report";

interface SanctionCardProps {
    sanction_check: SanctionCheckResult;
}

export function SanctionCard({ sanction_check }: SanctionCardProps) {
    const hasNoSanctionMatches =
        sanction_check.name_matches.length === 0 &&
        sanction_check.company_matches.length === 0;

    return (
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
                    {sanction_check.name_matches.map((match) => (
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
                    {sanction_check.company_matches.map((match) => (
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
    );
} 