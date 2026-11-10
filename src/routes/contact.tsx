import { createFileRoute } from "@tanstack/react-router";
import settings from "@/config/settings.json";
import { ContactForm } from "@/components/blocks/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => settings.routes["/contact"],
  component: ContactPage,
});

const grid =
  "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]";

function ContactPage() {
  return (
    <div className={`min-h-svh bg-background text-foreground ${grid}`}>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <span className="mb-4 inline-flex rounded-sm bg-[var(--color-21)] px-2.5 py-1 text-xs font-medium text-white">
          Contact
        </span>
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
          let's talk
          <span className="text-[var(--color-21)]">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Have a website in mind or want to work together? Leave your name and email and I will get back to you soon.
        </p>

        <div className="mt-12 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
            <ContactForm
              formId="contact"
              fields={[
                { name: "firstName", label: "First name", required: true, half: true, autoComplete: "given-name" },
                { name: "lastName", label: "Last name", required: true, half: true, autoComplete: "family-name" },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "country", label: "Country", autoComplete: "country-name" },
                { name: "inquiry", label: "Concerns / Inquiries", type: "textarea", rows: 5 },
              ]}
            />
          </div>
                  </div>
      </main>
    </div>
  );
}