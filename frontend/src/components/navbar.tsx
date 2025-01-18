"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-slate-50/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-slate-50/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
          >
            <Shield className="h-5 w-5" />
            TitanCheck
          </Link>
        </div>
      </div>
    </nav>
  );
} 