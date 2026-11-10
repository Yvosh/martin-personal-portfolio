import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { CheckCircle2, ChevronDown, LoaderCircle } from "lucide-react";
import * as React from "react";
import form from "@vibe/form";

type ContactField = {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "switch"
    | "file";
  required?: boolean;
  placeholder?: string;
  options?: (string | { label: string; value: string })[];
  rows?: number;
  autoComplete?: string;
  half?: boolean;
  multiple?: boolean;
  accept?: string;
};

// Matches what the endpoint accepts, so nothing is refused after the visitor has picked it.
const FILE_ACCEPT =
  ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf," +
  ".jpg,.jpeg,.png,.gif,.webp,.avif,.bmp,.ico,.tif,.tiff";
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const DEFAULT_MESSAGES = {
  invalidEmail: "Enter a valid email address",
  fileTooLarge: "Each file must be 10MB or smaller",
  fileRejected: "One of your files was refused. Each must be 10MB or smaller, and a document or image.",
  rateLimited: "Too many attempts just now. Please wait a moment and try again.",
  network: "That didn't reach us. Check your connection and try again.",
  previewUnavailable: "This preview can't send. Reload the page and try again.",
  failed: "Something went wrong. Please try again.",
};

// Without `required`, a missing field reads "<label> is required".
type Messages = typeof DEFAULT_MESSAGES & { required?: string };
type ContactFormMessages = Partial<Messages>;
type MessageKey = keyof typeof DEFAULT_MESSAGES;

// Nothing is sent when a submission fails, so each of these is something to fix and retry.
const FAILURES: Record<string, MessageKey> = {
  FILE_REJECTED: "fileRejected",
  RATE_LIMITED: "rateLimited",
  NETWORK: "network",
  PREVIEW_UNAVAILABLE: "previewUnavailable",
};

const DEFAULT_FIELDS: ContactField[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    autoComplete: "email",
  },
  { name: "message", label: "Message", type: "textarea", required: true },
];

function normalizeOptions(options: ContactField["options"]) {
  return (options ?? []).map((option) =>
    typeof option === "string"
      ? { label: option, value: option }
      : option
  );
}

function isMalformedEmail(form: HTMLFormElement, name: string) {
  const input = form.elements.namedItem(name);
  return input instanceof HTMLInputElement && input.validity.typeMismatch;
}

function validationErrors(
  fields: ContactField[],
  values: Record<string, string>,
  form: HTMLFormElement,
  text: Messages
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    if (field.type === "file") continue;
    const value = values[field.name] ?? "";
    if (field.required && value === "") {
      errors[field.name] = text.required ?? `${field.label} is required`;
    } else if (field.type === "email" && isMalformedEmail(form, field.name)) {
      errors[field.name] = text.invalidEmail;
    }
  }
  return errors;
}

type ContactFormProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  formId: string;
  onSubmit?: (values: Record<string, string>) => Promise<void> | void;
  fields?: ContactField[];
  submitLabel?: string;
  successMessage?: string;
  messages?: ContactFormMessages;
};

function ContactForm({
  formId,
  onSubmit,
  fields = DEFAULT_FIELDS,
  submitLabel = "Send message",
  successMessage = "Thanks — your message has been sent.",
  messages,
  className,
  children,
  ...props
}: ContactFormProps) {
  const text: Messages = { ...DEFAULT_MESSAGES, ...messages };
  const id = React.useId();
  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, ""]))
  );
  const [files, setFiles] = React.useState<Record<string, File[]>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [failure, setFailure] = React.useState<MessageKey>("failed");

  const clearError = (name: string) => {
    setStatus((current) => (current === "error" ? "idle" : current));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const setField = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const setFileField = (name: string, picked: File[]) => {
    setFiles((prev) => ({ ...prev, [name]: picked }));
    clearError(name);
  };

  const fileErrors = (): Record<string, string> =>
    Object.fromEntries(
      fields
        .filter((field) => field.type === "file")
        .map((field): [string, string] => {
          const picked = files[field.name] ?? [];
          if (field.required && picked.length === 0) {
            return [field.name, text.required ?? `${field.label} is required`];
          }
          if (picked.some((file) => file.size > MAX_FILE_BYTES)) {
            return [field.name, text.fileTooLarge];
          }
          return [field.name, ""];
        })
        .filter(([, message]) => message !== "")
    );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sentForm = event.currentTarget;
    const invalid = {
      ...validationErrors(fields, values, event.currentTarget, text),
      ...fileErrors(),
    };
    if (Object.keys(invalid).length > 0) {
      setErrors(invalid);
      return;
    }
    setStatus("submitting");
    try {
      const submitted = Object.fromEntries(
        fields
          .filter((field) => field.type !== "file")
          .map((field) => [field.name, values[field.name] ?? ""])
      );
      await form.submit({
        formId,
        form: sentForm,
        fields: fields.map((field) => ({
          name: field.name,
          label: field.label,
          ...(field.type === "file"
            ? { type: field.type, value: files[field.name] ?? [] }
            : { type: field.type ?? "text", value: submitted[field.name] ?? "" }),
        })),
      });
      await onSubmit?.(submitted);
      setStatus("success");
    } catch (error) {
      const code = (error as { code?: string } | null)?.code ?? "";
      setFailure(FAILURES[code] ?? "failed");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        data-slot="contact-form-success"
        role="status"
        className={cn(
          "flex items-center gap-3 rounded-card border bg-surface p-6 text-sm",
          className
        )}
      >
        <CheckCircle2 className="size-5 shrink-0 text-success" />
        {successMessage}
      </div>
    );
  }

  return (
    <form
      data-slot="contact-form"
      data-vibe-form-id={formId}
      noValidate
      onSubmit={handleSubmit}
      className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2", className)}
      {...props}
    >
      {fields.map((field) => {
        const fieldId = `${id}-${field.name}`;
        const error = errors[field.name];
        const invalid = error ? true : undefined;
        const fieldClass = cn(!field.half && "sm:col-span-2");
        const fieldErrors = error ? [{ message: error }] : undefined;

        if (field.type === "checkbox" || field.type === "switch") {
          const checked = values[field.name] === "true";
          const onCheckedChange = (next: boolean) =>
            setField(field.name, next ? "true" : "");
          return (
            <Field
              key={field.name}
              orientation="horizontal"
              data-invalid={invalid}
              className={fieldClass}
            >
              {field.type === "checkbox" ? (
                <Checkbox
                  id={fieldId}
                  checked={checked}
                  onCheckedChange={onCheckedChange}
                  aria-invalid={invalid}
                />
              ) : (
                <Switch
                  id={fieldId}
                  checked={checked}
                  onCheckedChange={onCheckedChange}
                  aria-invalid={invalid}
                />
              )}
              <FieldContent>
                <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
                <FieldError errors={fieldErrors} />
              </FieldContent>
            </Field>
          );
        }

        if (field.type === "file") {
          return (
            <Field
              key={field.name}
              data-invalid={invalid}
              className={fieldClass}
            >
              <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
              <Input
                id={fieldId}
                name={field.name}
                type="file"
                multiple={field.multiple}
                accept={field.accept ?? FILE_ACCEPT}
                aria-invalid={invalid}
                onChange={(event) =>
                  setFileField(field.name, Array.from(event.target.files ?? []))
                }
              />
              <FieldError errors={fieldErrors} />
            </Field>
          );
        }

        const shared = {
          id: fieldId,
          name: field.name,
          value: values[field.name] ?? "",
          "aria-invalid": invalid,
        };

        return (
          <Field key={field.name} data-invalid={invalid} className={fieldClass}>
            <FieldLabel id={`${fieldId}-label`} htmlFor={fieldId}>
              {field.label}
            </FieldLabel>
            {field.type === "textarea" ? (
              <Textarea
                {...shared}
                rows={field.rows ?? 5}
                placeholder={field.placeholder}
                onChange={(event) => setField(field.name, event.target.value)}
              />
            ) : field.type === "select" ? (
              <div className="relative">
                <select
                  {...shared}
                  required={field.required}
                  onChange={(event) => setField(field.name, event.target.value)}
                  className={cn(
                    "h-input-h w-full min-w-0 appearance-none rounded-input border border-input bg-transparent py-1 pr-9 pl-3 text-base shadow-input transition-[color,box-shadow] outline-none md:text-sm dark:bg-input/30",
                    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                    !shared.value && "text-muted-foreground"
                  )}
                >
                  <option value="" disabled={field.required}>
                    {field.placeholder}
                  </option>
                  {normalizeOptions(field.options).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            ) : field.type === "radio" ? (
              <div
                role="radiogroup"
                id={fieldId}
                aria-labelledby={`${fieldId}-label`}
                aria-invalid={invalid}
                className="grid w-full gap-2"
              >
                {normalizeOptions(field.options).map((option) => {
                  const optionId = `${fieldId}-${option.value}`;
                  return (
                    <div key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={optionId}
                        name={field.name}
                        value={option.value}
                        checked={shared.value === option.value}
                        onChange={() => setField(field.name, option.value)}
                        aria-invalid={invalid}
                        className="size-4 shrink-0 accent-primary"
                      />
                      <Label htmlFor={optionId} className="font-normal">
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Input
                {...shared}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                onChange={(event) => setField(field.name, event.target.value)}
              />
            )}
            <FieldError errors={fieldErrors} />
          </Field>
        );
      })}
      {children}
      {status === "error" && (
        <p role="alert" className="text-sm text-destructive sm:col-span-2">
          {text[failure]}
        </p>
      )}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2"
      >
        {status === "submitting" && <LoaderCircle className="animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}

export { ContactForm };
export type { ContactField, ContactFormMessages, ContactFormProps };