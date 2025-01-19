"use client";

import { Card } from "~/components/ui/card";
import { Phone } from "lucide-react";
import { PhoneCheckResult } from "~/app/types/report";
import { Button } from "~/components/ui/button";

interface PhoneCardProps {
    phone_check: PhoneCheckResult;
}

export function PhoneCard({ phone_check }: PhoneCardProps) {
    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
                <Phone className="h-5 w-5 text-slate-600" />
                <h2 className="font-medium text-slate-800">Phone Number</h2>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">{phone_check.phone_number}</p>
                <Button disabled variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                </Button>
            </div>
        </Card>
    );
} 