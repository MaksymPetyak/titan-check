import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { AutosizeTextarea } from '~/components/ui/autosize-textarea';


export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 bg-gradient-to-b from-slate-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black,transparent)] pointer-events-none" />

      <div className="container relative flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl text-center bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Verify people you find online
        </h1>
        <p className="text-sm text-muted-foreground text-center max-w-xl">
          Enter what you know about the person below, you can include emails, LinkedIn, and more.
        </p>
        <div className="w-full max-w-lg space-y-4">
          <div className="flex gap-2 items-center">
            <AutosizeTextarea
              placeholder="Enter or paste details about the person"
              className="resize-none"
            />
            <Button
              className="h-10 w-10 shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
