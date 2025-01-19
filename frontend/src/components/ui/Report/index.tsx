"use client";

import { Separator } from "~/components/ui/separator";
import { ReportOverview } from "~/app/types/report";
import { Header } from "./Header";
import { SanctionCard } from "./SanctionCard";
import { LinkedInCard } from "./LinkedInCard";
import { EmailCard } from "./EmailCard";
import { GoogleSearchCard } from "./GoogleSearchCard";
import { PhoneCard } from "./PhoneCard";

interface ReportProps {
    report: ReportOverview;
}

export function Report({ report }: ReportProps) {

    console.log("Report:", report);
    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
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

                {/* Phone Report */}
                {report.phone_check && (
                    <PhoneCard phone_check={report.phone_check} />
                )}
            </div>

            {/* Google Search Section - Full Width */}
            {report.google_search && (
                <div className="mt-6">
                    <GoogleSearchCard data={report.google_search} />
                </div>
            )}
        </div>
    );
} 