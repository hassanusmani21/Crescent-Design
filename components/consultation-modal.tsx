"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

type FormField =
  | "name"
  | "phone"
  | "email"
  | "projectLocation"
  | "projectType"
  | "propertyType"
  | "approximateArea"
  | "budgetRange"
  | "timeline"
  | "referralSource"
  | "message";

type FormState = Record<FormField, string>;

type OpenSource = "manual" | "automatic";

type ConsultationOpenEvent = CustomEvent<{ source?: OpenSource }>;

const SUBMITTED_KEY = "crescent-inquiry-submitted";

const fieldOrder: FormField[] = [
  "projectType",
  "propertyType",
  "projectLocation",
  "budgetRange",
  "timeline",
  "approximateArea",
  "name",
  "email",
  "phone",
  "referralSource",
  "message",
];

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  projectLocation: "",
  projectType: "",
  propertyType: "",
  approximateArea: "",
  budgetRange: "",
  timeline: "",
  referralSource: "",
  message: "",
};

const projectTypes = [
  "Residential Interior",
  "Commercial Interior",
  "Renovation",
  "Styling",
  "Consultation",
  "Turnkey Project",
  "Other",
];

const propertyTypes = ["Apartment", "Villa", "Townhouse", "Office", "Hospitality", "Retail", "Other"];

const budgetRanges = [
  "Basic",
  "Premium",
  "Gold",
  "Signature",
  "Not sure yet",
];

const timelines = ["Immediate", "1-3 months", "3-6 months", "6-12 months", "Planning ahead"];

function validateForm(form: FormState) {
  const errors: Partial<Record<FormField, string>> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+()\-\s0-9]{8,18}$/;

  if (form.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }

  if (!phonePattern.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!emailPattern.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.projectType) {
    errors.projectType = "Choose a project type.";
  }

  if (!form.budgetRange) {
    errors.budgetRange = "Choose a budget category.";
  }

  if (form.message.trim().length < 12) {
    errors.message = "Share a few details about the space and your goals.";
  }

  return errors;
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

function writeBrowserStorage(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // Ignore write failures in restricted browser contexts.
  }
}

function isConsultationRoute(pathname: string) {
  return /^\/(contact|consultation|consult|inquiry|booking)(\/|$)/.test(pathname);
}

function joinIds(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(" ") || undefined;
}

function FormLabel({
  children,
  required = false,
}: {
  children: string;
  required?: boolean;
}) {
  return (
    <span className="inquiry-field__label">
      <span>{children}</span>
      {required ? <span className="inquiry-field__required">Required</span> : null}
    </span>
  );
}

export function ConsultationModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverError, setServerError] = useState("");
  const firstFieldRef = useRef<HTMLSelectElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const previousOpenRef = useRef(false);
  const scrollRestoreRef = useRef<(() => void) | null>(null);
  const isInquiryRoute = isConsultationRoute(pathname);

  const closeModal = useCallback(() => {
    if (status === "submitting") {
      return;
    }

    setOpen(false);
  }, [status]);

  const openModal = useCallback(
    (source: OpenSource = "manual") => {
      if (typeof window === "undefined" || open) {
        return;
      }

      if (source === "manual" && isInquiryRoute) {
        const inlineForm = document.getElementById("consultation-inline-form");
        if (inlineForm instanceof HTMLElement) {
          inlineForm.scrollIntoView({ behavior: "smooth", block: "start" });
          inlineForm.focus();
          return;
        }
      }

      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

      if (status === "success") {
        setForm(initialForm);
      }

      setErrors({});
      setServerError("");
      setStatus("idle");
      setOpen(true);
    },
    [isInquiryRoute, open, status],
  );

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as ConsultationOpenEvent).detail;
      openModal(detail?.source === "automatic" ? "automatic" : "manual");
    };

    window.addEventListener("crescent:open-consultation", handleOpen as EventListener);

    return () => window.removeEventListener("crescent:open-consultation", handleOpen as EventListener);
  }, [openModal]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };
    const mainContent = document.getElementById("main-content");
    const previousAriaHidden = mainContent?.getAttribute("aria-hidden");

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    mainContent?.setAttribute("aria-hidden", "true");
    mainContent?.setAttribute("inert", "");

    scrollRestoreRef.current = () => {
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.left = previousBodyStyles.left;
      document.body.style.right = previousBodyStyles.right;
      document.body.style.width = previousBodyStyles.width;

      if (mainContent) {
        if (previousAriaHidden === null) {
          mainContent.removeAttribute("aria-hidden");
        } else {
          mainContent.setAttribute("aria-hidden", previousAriaHidden ?? "true");
        }
        mainContent.removeAttribute("inert");
      }

      window.scrollTo(0, scrollY);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusables = getFocusableElements(panelRef.current);
      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      scrollRestoreRef.current?.();
      scrollRestoreRef.current = null;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const focusTarget =
      status === "success" ? successHeadingRef.current : firstFieldRef.current ?? closeButtonRef.current;
    const timeoutId = window.setTimeout(() => focusTarget?.focus(), 70);

    return () => window.clearTimeout(timeoutId);
  }, [open, status]);

  useEffect(() => {
    if (previousOpenRef.current && !open) {
      window.setTimeout(() => returnFocusRef.current?.focus(), 0);
    }

    previousOpenRef.current = open;
  }, [open]);

  function fieldErrorId(field: FormField) {
    return `${field}-error`;
  }

  function fieldNoteId(field: FormField) {
    return `${field}-note`;
  }

  function updateField(field: FormField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setServerError("");

    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      const invalidElement = event.currentTarget.elements.namedItem(firstInvalidField);
      if (invalidElement instanceof HTMLElement) {
        invalidElement.focus();
      }
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      writeBrowserStorage(window.localStorage, SUBMITTED_KEY, "true");
      setStatus("success");
      setForm(initialForm);
      setErrors({});
    } catch {
      setServerError("We couldn’t send your inquiry. Please review your details and try again.");
      setStatus("idle");
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="inquiry-modal__backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <section
        ref={panelRef}
        id="consultation-modal"
        className="inquiry-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
        aria-describedby="inquiry-modal-description"
      >
        <aside className="inquiry-modal__aside">
          <div className="inquiry-modal__aside-copy">
            <p className="section-label inquiry-modal__eyebrow">Private Consultation</p>
            <h2 className="inquiry-modal__aside-title">Let&apos;s shape your space.</h2>
            <p className="inquiry-modal__aside-description">
              Tell us a little about your property, priorities, and timeline. Our studio will review your inquiry and
              return with the clearest next step.
            </p>

            <ul className="inquiry-modal__trust-list" aria-label="Consultation highlights">
              <li>Thoughtful guidance</li>
              <li>Tailored project direction</li>
              <li>Residential and commercial interiors</li>
            </ul>
          </div>

          <div className="inquiry-modal__aside-media">
            <Image
              src="/interiors/hero-cinematic-living.jpg"
              alt="Refined living room with sculptural seating, marble surfaces, and warm ambient lighting."
              fill
              sizes="(max-width: 1023px) 100vw, 34vw"
              className="object-cover"
            />
          </div>
        </aside>

        <div className="inquiry-modal__body">
          <div className="inquiry-modal__header">
            <div>
              <p className="section-label inquiry-modal__eyebrow lg:hidden">Private Consultation</p>
              <h2 id="inquiry-modal-title" className="inquiry-modal__title">
                {status === "success" ? "Inquiry received" : "Tell us about your project"}
              </h2>
              <p id="inquiry-modal-description" className="inquiry-modal__description">
                {status === "success"
                  ? "Our studio has received your details and will review your brief carefully."
                  : "Share a few details and our studio will contact you to discuss the next steps."}
              </p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className="inquiry-modal__close"
              aria-label="Close consultation form"
              onClick={closeModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {status === "success" ? (
            <div className="inquiry-success">
              <p className="section-label inquiry-success__eyebrow">Inquiry received</p>
              <h3 ref={successHeadingRef} tabIndex={-1} className="inquiry-success__title">
                Thank you for sharing your project.
              </h3>
              <p className="inquiry-success__copy">
                Our studio has received your inquiry and will use the details provided to review your brief and shape
                the next conversation.
              </p>
              <button type="button" className="inquiry-submit" onClick={closeModal}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="inquiry-modal__mobile-copy lg:hidden">
                <p>
                  Share your property, scope, and priorities. We&apos;ll review the brief and return with the clearest
                  next step.
                </p>
              </div>

              <form id="consultation-inline-form" tabIndex={-1} className="inquiry-form" onSubmit={handleSubmit} noValidate>
                <div className="inquiry-form__section">
                  <div className="inquiry-form__section-header">
                    <p className="inquiry-form__step">01</p>
                    <div>
                      <h3 className="inquiry-form__section-title">Project basics</h3>
                      <p className="inquiry-form__section-copy">Service, property, and location.</p>
                    </div>
                  </div>

                  <div className="inquiry-form__grid">
                    <label className="inquiry-field">
                      <FormLabel required>Project type</FormLabel>
                      <select
                        ref={firstFieldRef}
                        name="projectType"
                        value={form.projectType}
                        onChange={(event) => updateField("projectType", event.target.value)}
                        className="inquiry-field__control inquiry-field__select"
                        aria-invalid={Boolean(errors.projectType)}
                        aria-describedby={errors.projectType ? fieldErrorId("projectType") : undefined}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.projectType ? (
                        <span id={fieldErrorId("projectType")} className="inquiry-field__error">
                          {errors.projectType}
                        </span>
                      ) : null}
                    </label>

                    <label className="inquiry-field">
                      <FormLabel>Property type</FormLabel>
                      <select
                        name="propertyType"
                        value={form.propertyType}
                        onChange={(event) => updateField("propertyType", event.target.value)}
                        className="inquiry-field__control inquiry-field__select"
                      >
                        <option value="">Select property type</option>
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="inquiry-field">
                      <FormLabel>Project location</FormLabel>
                      <input
                        type="text"
                        name="projectLocation"
                        value={form.projectLocation}
                        onChange={(event) => updateField("projectLocation", event.target.value)}
                        className="inquiry-field__control"
                        placeholder="City or site location"
                        autoComplete="address-level2"
                      />
                    </label>

                    <label className="inquiry-field">
                      <FormLabel>Approximate area</FormLabel>
                      <input
                        type="text"
                        name="approximateArea"
                        value={form.approximateArea}
                        onChange={(event) => updateField("approximateArea", event.target.value)}
                        className="inquiry-field__control"
                        placeholder="e.g. 1800 sq ft"
                      />
                    </label>
                  </div>
                </div>

                <div className="inquiry-form__section">
                  <div className="inquiry-form__section-header">
                    <p className="inquiry-form__step">02</p>
                    <div>
                      <h3 className="inquiry-form__section-title">Project planning</h3>
                      <p className="inquiry-form__section-copy">Budget, timeline, and the scope you want us to review.</p>
                    </div>
                  </div>

                  <div className="inquiry-form__grid">
                    <label className="inquiry-field">
                      <FormLabel required>Budget category</FormLabel>
                      <select
                        name="budgetRange"
                        value={form.budgetRange}
                        onChange={(event) => updateField("budgetRange", event.target.value)}
                        className="inquiry-field__control inquiry-field__select"
                        aria-invalid={Boolean(errors.budgetRange)}
                        aria-describedby={errors.budgetRange ? fieldErrorId("budgetRange") : undefined}
                      >
                        <option value="">Select budget category</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      {errors.budgetRange ? (
                        <span id={fieldErrorId("budgetRange")} className="inquiry-field__error">
                          {errors.budgetRange}
                        </span>
                      ) : null}
                    </label>

                    <label className="inquiry-field">
                      <FormLabel>Desired timeline</FormLabel>
                      <select
                        name="timeline"
                        value={form.timeline}
                        onChange={(event) => updateField("timeline", event.target.value)}
                        className="inquiry-field__control inquiry-field__select"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="inquiry-field inquiry-field--full">
                      <FormLabel required>Project description</FormLabel>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        className="inquiry-field__control inquiry-field__textarea"
                        placeholder="Tell us about the rooms, style direction, timeline, and any constraints that matter."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={joinIds(fieldNoteId("message"), errors.message ? fieldErrorId("message") : undefined)}
                      />
                      <span id={fieldNoteId("message")} className="inquiry-field__note">
                        Include the space type, atmosphere, and the decisions you need help with.
                      </span>
                      {errors.message ? (
                        <span id={fieldErrorId("message")} className="inquiry-field__error">
                          {errors.message}
                        </span>
                      ) : null}
                    </label>
                  </div>
                </div>

                <div className="inquiry-form__section">
                  <div className="inquiry-form__section-header">
                    <p className="inquiry-form__step">03</p>
                    <div>
                      <h3 className="inquiry-form__section-title">Contact details</h3>
                      <p className="inquiry-form__section-copy">How we should reach you after we review the brief.</p>
                    </div>
                  </div>

                  <div className="inquiry-form__grid">
                    <label className="inquiry-field">
                      <FormLabel required>Full name</FormLabel>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className="inquiry-field__control"
                        placeholder="Your full name"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? fieldErrorId("name") : undefined}
                      />
                      {errors.name ? (
                        <span id={fieldErrorId("name")} className="inquiry-field__error">
                          {errors.name}
                        </span>
                      ) : null}
                    </label>

                    <label className="inquiry-field">
                      <FormLabel required>Email</FormLabel>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        className="inquiry-field__control"
                        placeholder="you@example.com"
                        autoComplete="email"
                        inputMode="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? fieldErrorId("email") : undefined}
                      />
                      {errors.email ? (
                        <span id={fieldErrorId("email")} className="inquiry-field__error">
                          {errors.email}
                        </span>
                      ) : null}
                    </label>

                    <label className="inquiry-field">
                      <FormLabel required>Phone number</FormLabel>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        className="inquiry-field__control"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? fieldErrorId("phone") : undefined}
                      />
                      {errors.phone ? (
                        <span id={fieldErrorId("phone")} className="inquiry-field__error">
                          {errors.phone}
                        </span>
                      ) : null}
                    </label>

                    <label className="inquiry-field">
                      <FormLabel>Referral source</FormLabel>
                      <input
                        type="text"
                        name="referralSource"
                        value={form.referralSource}
                        onChange={(event) => updateField("referralSource", event.target.value)}
                        className="inquiry-field__control"
                        placeholder="Instagram, referral, search, other"
                      />
                    </label>
                  </div>
                </div>

                <div className="inquiry-form__footer">
                  <div aria-live="polite">
                    {serverError ? (
                      <p role="alert" className="inquiry-form__error-banner">
                        {serverError}
                      </p>
                    ) : null}
                  </div>

                  <div className="inquiry-form__actions">
                    <button type="submit" className="inquiry-submit" disabled={status === "submitting"}>
                      {status === "submitting" ? (
                        <>
                          <span className="inquiry-submit__spinner" aria-hidden="true" />
                          <span>Sending inquiry...</span>
                        </>
                      ) : (
                        <span>Send Project Inquiry</span>
                      )}
                    </button>

                    <button type="button" className="inquiry-secondary-action" onClick={closeModal}>
                      Close for now
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
