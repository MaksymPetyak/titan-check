"use client";

import { Separator } from "~/components/ui/separator";
import { ReportOverview } from "~/app/types/report";
import { Header } from "./Header";
import { SanctionCard } from "./SanctionCard";
import { LinkedInCard } from "./LinkedInCard";
import { EmailCard } from "./EmailCard";

interface ReportProps {
    report: ReportOverview;
}

export function Report({ report }: ReportProps) {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-2 p-4">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <Header extracted_info={report.extracted_info} />
                </div>
            </div>

            <Separator />

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sanctions Section */}
                {report.sanction_check && (
                    <SanctionCard sanction_check={report.sanction_check} />
                )}

                {/* LinkedIn Report */}
                {report.linkedin_profile && (
                    <LinkedInCard
                        linkedin_profile={report.linkedin_profile}
                        linkedin_url={report.extracted_info.linkedin}
                    />
                )}

                {/* Email Report */}
                {report.email_check && (
                    <EmailCard
                        email_check={report.email_check}
                        email={report.extracted_info.email}
                    />
                )}
            </div>
        </div>
    );
} 