"use client";

import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Mail } from "lucide-react";
import { EmailCheckResult } from "~/app/types/report";

interface EmailCardProps {
    email_check: EmailCheckResult;
    email: string | null;
}

export function EmailCard({ email_check, email }: EmailCardProps) {
    const getRiskColor = (isRisky: boolean) => {
        return isRisky ? "border-red-500/50" : "border-green-500/50";
    };

    return (
        <Card className={`p-6 border-2 ${getRiskColor(email_check.is_disposable || !email_check.exists)}`}>
            <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5" />
                <h2 className="font-medium">Email Analysis</h2>
            </div>
            <div className="space-y-2">
                {email && (
                    <p className="text-sm text-muted-foreground break-all">
                        {email}
                    </p>
                )}
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getRiskColor(email_check.is_disposable)}>
                        {email_check.is_disposable ? "Disposable Email" : "Not Disposable"}
                    </Badge>
                    <Badge variant="outline" className={getRiskColor(!email_check.exists)}>
                        {email_check.exists ? "Exists" : "Does Not Exist"}
                    </Badge>
                    <Badge variant="outline" className={getRiskColor(email_check.is_private)}>
                        {email_check.is_private ? "Private Email" : "Corporate Email"}
                    </Badge>
                </div>
            </div>
        </Card>
    );
} 