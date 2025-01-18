"use client";

import { Building2 } from "lucide-react";
import { ExtractedInfo } from "~/app/types/report";

interface HeaderProps {
    extracted_info: ExtractedInfo;
}

export function Header({ extracted_info }: HeaderProps) {
    return (
        <div className="space-y-2">
            <div>
                <h1 className="text-xl font-medium text-slate-900">
                    {extracted_info.name ?? 'Unknown Person'}
                </h1>
                {extracted_info.company && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Building2 className="h-4 w-4" />
                        <span>{extracted_info.company}</span>
                    </div>
                )}
            </div>
        </div>
    );
} 