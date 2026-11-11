import type { Metadata } from "next";
import Certification from "@/layout/Certification";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Courses and certifications I have completed in web development.",
};

function Page() {
  return (
    <main className="min-h-screen w-full bg-background">
      <div className="relative overflow-hidden border-b border-border bg-surface">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />

        <div className="container relative mx-auto px-4 py-14 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">
            My{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Certifications
            </span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Courses and training that keep my skills sharp and up to date.
          </p>
        </div>
      </div>

      <Certification />
    </main>
  );
}

export default Page;