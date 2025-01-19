"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Linkedin, Building2, MapPin, Users } from "lucide-react";
import { LinkedInProfile } from "~/app/types/report";
import Link from "next/link";

interface LinkedInCardProps {
    linkedin_profile: LinkedInProfile;
    linkedin_url: string | null;
}

export function LinkedInCard({ linkedin_profile, linkedin_url }: LinkedInCardProps) {
    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <Linkedin className="h-5 w-5 text-blue-600" />
                <h2 className="font-medium text-slate-800">LinkedIn Profile</h2>
                {linkedin_profile.is_verified && (
                    <Badge variant="outline" className="ml-auto border-green-500/50 text-green-700">
                        Verified
                    </Badge>
                )}
            </div>
            {linkedin_url && (
                <div className="pt-2">
                    <Link
                        href={linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                    >
                        {linkedin_url}
                    </Link>
                </div>
            )}
            <div className="space-y-2">
                <p className="font-medium">{linkedin_profile.name}</p>
                <p className="text-sm text-muted-foreground">{linkedin_profile.headline}</p>
                {linkedin_profile.current_company && (
                    <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-slate-600" />
                        <span>{linkedin_profile.current_company}</span>
                    </div>
                )}
                {linkedin_profile.location && (
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-600" />
                        <span>{linkedin_profile.location}</span>
                    </div>
                )}
                {linkedin_profile.connections && (
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-slate-600" />
                        <span>{linkedin_profile.connections} connections</span>
                    </div>
                )}
            </div>
        </Card>
    );
} 