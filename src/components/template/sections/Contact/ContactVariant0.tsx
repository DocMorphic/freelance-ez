"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import type { ContactSectionConfig, CompanyInfo, FormField } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Contact.module.css";

interface Props {
  config: ContactSectionConfig;
  company?: CompanyInfo;
}

/** Variant 0 — Two-column: contact info left, form right */
export default function ContactVariant0({ config, company }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [activeType, setActiveType] = useState(
    config.formTypes?.[0]?.id ?? ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  // Get the active fields — either from formTypes or fallback to formFields
  const activeFields: FormField[] =
    config.formTypes && config.formTypes.length > 0
      ? config.formTypes.find((t) => t.id === activeType)?.fields ?? config.formTypes[0].fields
      : config.formFields;

  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      <div className="t-section-header">
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      <div className={styles.contactGrid}>
        {/* Contact info */}
        {config.showContactInfo && company && (
          <div className={styles.contactInfo}>
            <h3>Get In Touch</h3>
            <p className={styles.contactInfoDesc}>
              Reach out to us directly. We respond to all inquiries promptly.
            </p>

            <div className={styles.contactList}>
              {company.contact.phone && (
                <a href={`tel:${company.contact.phone}`} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className={styles.contactItemLabel}>Phone</span>
                    <span className={styles.contactItemValue}>{company.contact.phone}</span>
                  </div>
                </a>
              )}

              <a href={`mailto:${company.contact.email}`} className={styles.contactItem}>
                <div className={styles.contactItemIcon}>
                  <Mail size={20} />
                </div>
                <div>
                  <span className={styles.contactItemLabel}>Email</span>
                  <span className={styles.contactItemValue}>{company.contact.email}</span>
                </div>
              </a>

              {config.showWhatsApp && company.contact.whatsapp && (
                <a
                  href={`https://wa.me/${company.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello! I'm interested in your services.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                >
                  <div className={styles.contactItemIcon}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className={styles.contactItemLabel}>WhatsApp</span>
                    <span className={styles.contactItemValue}>Chat directly</span>
                  </div>
                </a>
              )}

              {company.location.address && (
                <div className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className={styles.contactItemLabel}>Address</span>
                    <span className={styles.contactItemValue}>
                      {[company.location.address, company.location.city, company.location.state, company.location.country]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <div className={`t-card ${styles.formCard}`}>
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <CheckCircle size={32} />
              </div>
              <h3>Thank You!</h3>
              <p>Your message has been received. We&apos;ll get back to you within 24 hours.</p>
              <button
                className="t-btn t-btn-secondary"
                onClick={() => {
                  setIsSubmitted(false);
                  setError("");
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Type selector */}
              {config.formTypes && config.formTypes.length > 1 && (
                <div className={styles.typeSelector}>
                  {config.formTypes.map((ft) => (
                    <button
                      key={ft.id}
                      type="button"
                      className={`${styles.typeBtn} ${activeType === ft.id ? styles.typeBtnActive : ""}`}
                      onClick={() => setActiveType(ft.id)}
                    >
                      {ft.label}
                    </button>
                  ))}
                </div>
              )}

              {activeFields.map((field, i) => {
                const isShortField = field.type !== "textarea";
                const nextField = activeFields[i + 1];
                const prevField = activeFields[i - 1];
                const nextIsShort = nextField && nextField.type !== "textarea";
                const prevIsShort = prevField && prevField.type !== "textarea";
                const isFirstInPair = isShortField && nextIsShort && i % 2 === 0;
                const isSecondInPair = isShortField && prevIsShort && i % 2 === 1;

                if (isSecondInPair) return null;

                if (isFirstInPair && nextField) {
                  return (
                    <div key={`${activeType}-${i}`} className={styles.formRow}>
                      <RenderField field={field} />
                      <RenderField field={nextField} />
                    </div>
                  );
                }

                return <RenderField key={`${activeType}-${i}`} field={field} />;
              })}

              {error && <p className={styles.errorMessage}>{error}</p>}

              <button
                type="submit"
                className={`t-btn t-btn-primary ${styles.submitBtn}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className={styles.spinning} /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

function RenderField({ field }: { field: FormField }) {
  const id = `contact-${field.name}`;

  if (field.type === "textarea") {
    return (
      <div className="t-form-group">
        <label htmlFor={id}>
          {field.label}{field.required && <span className={styles.required}> *</span>}
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
          {field.label}{field.required && <span className={styles.required}> *</span>}
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
        {field.label}{field.required && <span className={styles.required}> *</span>}
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
