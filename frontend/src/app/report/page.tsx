'use client';

import { Report } from "~/components/ui/Report";
import { mockReport } from "~/app/types/mock";

export default function ReportPage() {
    return (
        <main className="bg-slate-50 py-12">
            <Report report={mockReport} />
        </main>
    );
}
