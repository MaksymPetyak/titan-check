import { Input } from "~/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-32">
      <div className="container flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl text-center">
          Verify people you find online
        </h1>
        <p className="text-sm text-muted-foreground text-center max-w-xl">
          Enter what you know about the person below, you can include emails, LinekdIn, and more.
        </p>
        <div className="w-full max-w-lg space-y-4">
          <Input
            type="text"
            placeholder="Enter details about the person..."
            className="h-14 text-lg shadow-lg border-2 transition-all duration-200 focus:scale-[1.02] hover:border-primary"
          />
        </div>
      </div>
    </main>
  );
}
