'use client';

import { Button } from "~/components/ui/button";
import { Search, Shield } from "lucide-react";
import { AutosizeTextarea } from '~/components/ui/autosize-textarea';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/report?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      handleSearch();
    }
  };

  return (
    <main className="flex-grow bg-slate-50 flex">
      <div className="relative w-full flex flex-col justify-center mb-8 lg:mb-32">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black,transparent)] pointer-events-none" />

        <div className="relative container flex flex-col w-full items-center gap-4 px-4 mx-auto">
          <div className="flex items-center gap-2 text-2xl font-medium text-slate-700">
            <Shield className="h-7 w-7" />
            TitanCheck
          </div>
          <h1 className="text-xl font-medium tracking-tight sm:text-3xl text-center bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Verify people you meet online
          </h1>
          <p className="text-sm text-muted-foreground text-center max-w-xl">
            Enter what you know about the person below. <br />
            You can include emails, LinkedIn, phone number, and more.
          </p>
          <div className="w-full max-w-lg space-y-4">
            <div className="flex gap-2 items-center">
              <AutosizeTextarea
                placeholder="Enter or paste details about the person"
                className="resize-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                className="h-10 w-10 shadow-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={handleSearch}
                disabled={!query.trim()}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
