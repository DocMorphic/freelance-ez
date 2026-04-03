"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { ContactSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Contact.module.css";

interface Props {
  config: ContactSectionConfig;
}

/** Variant 1 — Centered form only, no contact info sidebar */
export default function ContactVariant1({ config }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      <div className={styles.centeredForm}>
        <div className={`t-card ${styles.formCard}`}>
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>&#10003;</div>
              <h3>Thank You!</h3>
              <p>Your message has been received. We will get back to you soon.</p>
              <button
                className="t-btn t-btn-secondary"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {config.formFields.map((field, i) => {
                const isShortField = field.type !== "textarea";
                const nextField = config.formFields[i + 1];
                const prevField = config.formFields[i - 1];
                const nextIsShort = nextField && nextField.type !== "textarea";
                const prevIsShort = prevField && prevField.type !== "textarea";
                const isFirstInPair = isShortField && nextIsShort && i % 2 === 0;
                const isSecondInPair = isShortField && prevIsShort && i % 2 === 1;

                if (isSecondInPair) return null;

                if (isFirstInPair && nextField) {
                  return (
                    <div key={i} className={styles.formRow}>
                      <FormField field={field} />
                      <FormField field={nextField} />
                    </div>
                  );
                }

                return <FormField key={i} field={field} />;
              })}

              <button
                type="submit"
                className={`t-btn t-btn-primary ${styles.submitBtn}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

function FormField({ field }: { field: ContactSectionConfig["formFields"][number] }) {
  const id = `contact-${field.name}`;

  if (field.type === "textarea") {
    return (
      <div className="t-form-group">
        <label htmlFor={id}>
          {field.label}{field.required && " *"}
        </label>
        <textarea
          id={id}
          name={field.name}
          className="t-form-textarea"
          required={field.required}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div className="t-form-group">
        <label htmlFor={id}>
          {field.label}{field.required && " *"}
        </label>
        <select
          id={id}
          name={field.name}
          className="t-form-select"
          required={field.required}
        >
          <option value="">{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>
          {field.options.map((opt, j) => (
            <option key={j} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="t-form-group">
      <label htmlFor={id}>
        {field.label}{field.required && " *"}
      </label>
      <input
        type={field.type}
        id={id}
        name={field.name}
        className="t-form-input"
        required={field.required}
        placeholder={field.placeholder}
      />
    </div>
  );
}
