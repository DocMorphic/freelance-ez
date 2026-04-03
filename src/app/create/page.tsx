"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { UserInput } from "@/types/site-config";
import s from "./create.module.css";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Real Estate",
  "Education",
  "Food & Beverage",
  "Retail",
  "Manufacturing",
  "Legal",
  "Marketing",
  "Construction",
  "Consulting",
  "Other",
];

const STEPS = [
  "Company Basics",
  "Services",
  "Contact Info",
  "Design Preferences",
  "Review",
];

type Service = { name: string; description: string };
type Product = { name: string; description: string };

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1 — Company Basics
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");

  // Step 2 — Services & Products
  const [services, setServices] = useState<Service[]>([
    { name: "", description: "" },
  ]);
  const [products, setProducts] = useState<Product[]>([]);

  // Step 3 — Contact
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  // Step 4 — Design
  const [designDescription, setDesignDescription] = useState("");
  const [preferDarkMode, setPreferDarkMode] = useState(false);
  const [wantBlog, setWantBlog] = useState(false);
  const [wantCaseStudies, setWantCaseStudies] = useState(false);

  // --- Service helpers ---
  function updateService(i: number, field: keyof Service, value: string) {
    setServices((prev) =>
      prev.map((svc, idx) => (idx === i ? { ...svc, [field]: value } : svc))
    );
  }
  function addService() {
    setServices((prev) => [...prev, { name: "", description: "" }]);
  }
  function removeService(i: number) {
    setServices((prev) => prev.filter((_, idx) => idx !== i));
  }

  // --- Product helpers ---
  function updateProduct(i: number, field: keyof Product, value: string) {
    setProducts((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p))
    );
  }
  function addProduct() {
    setProducts((prev) => [...prev, { name: "", description: "" }]);
  }
  function removeProduct(i: number) {
    setProducts((prev) => prev.filter((_, idx) => idx !== i));
  }

  // --- Validation per step ---
  function canProceed(): boolean {
    switch (step) {
      case 0:
        return companyName.trim() !== "" && industry !== "" && description.trim() !== "";
      case 1:
        return (
          services.length >= 1 &&
          services.every((svc) => svc.name.trim() !== "" && svc.description.trim() !== "")
        );
      case 2:
        return contactEmail.trim() !== "" && country.trim() !== "";
      case 3:
        return designDescription.trim() !== "";
      default:
        return true;
    }
  }

  // --- Build UserInput ---
  function buildInput(): UserInput {
    const input: UserInput = {
      companyName: companyName.trim(),
      industry,
      description: description.trim(),
      services: services.map((svc) => ({
        name: svc.name.trim(),
        description: svc.description.trim(),
      })),
      contactEmail: contactEmail.trim(),
      country: country.trim(),
      designDescription: designDescription.trim(),
    };
    if (tagline.trim()) input.tagline = tagline.trim();
    if (products.length > 0 && products.some((p) => p.name.trim())) {
      input.products = products
        .filter((p) => p.name.trim())
        .map((p) => ({ name: p.name.trim(), description: p.description.trim() }));
    }
    if (contactPhone.trim()) input.contactPhone = contactPhone.trim();
    if (contactAddress.trim()) input.contactAddress = contactAddress.trim();
    if (city.trim()) input.city = city.trim();
    if (whatsapp.trim()) input.whatsapp = whatsapp.trim();
    const social: Record<string, string> = {};
    if (linkedin.trim()) social.linkedin = linkedin.trim();
    if (twitter.trim()) social.twitter = twitter.trim();
    if (instagram.trim()) social.instagram = instagram.trim();
    if (facebook.trim()) social.facebook = facebook.trim();
    if (Object.keys(social).length > 0) input.socialLinks = social;
    if (preferDarkMode) input.preferDarkMode = true;
    if (wantBlog) input.wantBlog = true;
    if (wantCaseStudies) input.wantCaseStudies = true;
    return input;
  }

  // --- Submit ---
  async function handleGenerate() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildInput()),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }
      router.push(`/preview/${data.siteId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  // --- Render steps ---
  function renderStep() {
    switch (step) {
      case 0:
        return (
          <>
            <p className={s.stepHeading}>Tell us about your company</p>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="companyName">
                Company Name
              </label>
              <input
                id="companyName"
                className={s.input}
                type="text"
                placeholder="Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="industry">
                Industry
              </label>
              <select
                id="industry"
                className={s.select}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select an industry...</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="tagline">
                Tagline <span className={s.labelOptional}>(optional)</span>
              </label>
              <input
                id="tagline"
                className={s.input}
                type="text"
                placeholder="Engineering Tomorrow's Infrastructure"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className={s.textarea}
                placeholder="What does your company do? Who are your customers?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </>
        );

      case 1:
        return (
          <>
            <p className={s.stepHeading}>What services do you offer?</p>
            {services.map((svc, i) => (
              <div key={i} className={s.listItem}>
                <div className={s.listItemHeader}>
                  <span className={s.listItemNumber}>Service {i + 1}</span>
                  {services.length > 1 && (
                    <button
                      type="button"
                      className={s.removeBtn}
                      onClick={() => removeService(i)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className={s.formGroup}>
                  <label className={s.label} htmlFor={`svc-name-${i}`}>
                    Name
                  </label>
                  <input
                    id={`svc-name-${i}`}
                    className={s.input}
                    type="text"
                    placeholder="e.g., Web Development"
                    value={svc.name}
                    onChange={(e) => updateService(i, "name", e.target.value)}
                  />
                </div>
                <div className={s.formGroup}>
                  <label className={s.label} htmlFor={`svc-desc-${i}`}>
                    Description
                  </label>
                  <textarea
                    id={`svc-desc-${i}`}
                    className={s.textarea}
                    placeholder="Briefly describe this service..."
                    value={svc.description}
                    onChange={(e) =>
                      updateService(i, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <button type="button" className={s.addBtn} onClick={addService}>
              + Add Service
            </button>

            <hr className={s.sectionDivider} />

            <p className={s.sectionTitle}>
              Products <span className={s.labelOptional}>(optional)</span>
            </p>
            {products.map((prod, i) => (
              <div key={i} className={s.listItem}>
                <div className={s.listItemHeader}>
                  <span className={s.listItemNumber}>Product {i + 1}</span>
                  <button
                    type="button"
                    className={s.removeBtn}
                    onClick={() => removeProduct(i)}
                  >
                    Remove
                  </button>
                </div>
                <div className={s.formGroup}>
                  <label className={s.label} htmlFor={`prod-name-${i}`}>
                    Name
                  </label>
                  <input
                    id={`prod-name-${i}`}
                    className={s.input}
                    type="text"
                    placeholder="e.g., Analytics Dashboard"
                    value={prod.name}
                    onChange={(e) => updateProduct(i, "name", e.target.value)}
                  />
                </div>
                <div className={s.formGroup}>
                  <label className={s.label} htmlFor={`prod-desc-${i}`}>
                    Description
                  </label>
                  <textarea
                    id={`prod-desc-${i}`}
                    className={s.textarea}
                    placeholder="Briefly describe this product..."
                    value={prod.description}
                    onChange={(e) =>
                      updateProduct(i, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <button type="button" className={s.addBtn} onClick={addProduct}>
              + Add Product
            </button>
          </>
        );

      case 2:
        return (
          <>
            <p className={s.stepHeading}>How can people reach you?</p>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="contactEmail">
                Email
              </label>
              <input
                id="contactEmail"
                className={s.input}
                type="email"
                placeholder="hello@company.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="contactPhone">
                Phone <span className={s.labelOptional}>(optional)</span>
              </label>
              <input
                id="contactPhone"
                className={s.input}
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="contactAddress">
                Address <span className={s.labelOptional}>(optional)</span>
              </label>
              <input
                id="contactAddress"
                className={s.input}
                type="text"
                placeholder="123 Main Street"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="city">
                City <span className={s.labelOptional}>(optional)</span>
              </label>
              <input
                id="city"
                className={s.input}
                type="text"
                placeholder="Austin"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="country">
                Country
              </label>
              <input
                id="country"
                className={s.input}
                type="text"
                placeholder="USA"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="whatsapp">
                WhatsApp <span className={s.labelOptional}>(optional)</span>
              </label>
              <input
                id="whatsapp"
                className={s.input}
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <hr className={s.sectionDivider} />

            <p className={s.sectionTitle}>
              Social Links <span className={s.labelOptional}>(optional)</span>
            </p>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="linkedin">
                LinkedIn
              </label>
              <input
                id="linkedin"
                className={s.input}
                type="text"
                placeholder="https://linkedin.com/company/..."
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="twitter">
                Twitter / X
              </label>
              <input
                id="twitter"
                className={s.input}
                type="text"
                placeholder="https://twitter.com/..."
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="instagram">
                Instagram
              </label>
              <input
                id="instagram"
                className={s.input}
                type="text"
                placeholder="https://instagram.com/..."
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="facebook">
                Facebook
              </label>
              <input
                id="facebook"
                className={s.input}
                type="text"
                placeholder="https://facebook.com/..."
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <p className={s.stepHeading}>Design preferences</p>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="designDescription">
                Describe the look and feel you want
              </label>
              <textarea
                id="designDescription"
                className={s.textarea}
                placeholder="e.g., Dark and premium, Modern and clean, Bright and friendly..."
                value={designDescription}
                onChange={(e) => setDesignDescription(e.target.value)}
              />
            </div>
            <div className={s.checkGroup}>
              <input
                id="preferDarkMode"
                type="checkbox"
                checked={preferDarkMode}
                onChange={(e) => setPreferDarkMode(e.target.checked)}
              />
              <label className={s.checkLabel} htmlFor="preferDarkMode">
                Prefer dark mode
              </label>
            </div>
            <div className={s.checkGroup}>
              <input
                id="wantBlog"
                type="checkbox"
                checked={wantBlog}
                onChange={(e) => setWantBlog(e.target.checked)}
              />
              <label className={s.checkLabel} htmlFor="wantBlog">
                Include a blog section
              </label>
            </div>
            <div className={s.checkGroup}>
              <input
                id="wantCaseStudies"
                type="checkbox"
                checked={wantCaseStudies}
                onChange={(e) => setWantCaseStudies(e.target.checked)}
              />
              <label className={s.checkLabel} htmlFor="wantCaseStudies">
                Include case studies
              </label>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <p className={s.stepHeading}>Review your details</p>

            <div className={s.reviewSection}>
              <p className={s.reviewLabel}>Company</p>
              <p className={s.reviewValue}>
                <strong>{companyName}</strong> &middot; {industry}
              </p>
              {tagline && (
                <p className={s.reviewValue} style={{ fontStyle: "italic" }}>
                  {tagline}
                </p>
              )}
              <p className={s.reviewValue}>{description}</p>
            </div>

            <div className={s.reviewSection}>
              <p className={s.reviewLabel}>Services</p>
              <ul className={s.reviewList}>
                {services.map((svc, i) => (
                  <li key={i}>
                    <strong>{svc.name}</strong> &mdash; {svc.description}
                  </li>
                ))}
              </ul>
            </div>

            {products.length > 0 && products.some((p) => p.name.trim()) && (
              <div className={s.reviewSection}>
                <p className={s.reviewLabel}>Products</p>
                <ul className={s.reviewList}>
                  {products
                    .filter((p) => p.name.trim())
                    .map((p, i) => (
                      <li key={i}>
                        <strong>{p.name}</strong> &mdash; {p.description}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <div className={s.reviewSection}>
              <p className={s.reviewLabel}>Contact</p>
              <p className={s.reviewValue}>{contactEmail}</p>
              {contactPhone && (
                <p className={s.reviewValue}>{contactPhone}</p>
              )}
              {contactAddress && (
                <p className={s.reviewValue}>{contactAddress}</p>
              )}
              <p className={s.reviewValue}>
                {[city, country].filter(Boolean).join(", ")}
              </p>
            </div>

            <div className={s.reviewSection}>
              <p className={s.reviewLabel}>Design</p>
              <p className={s.reviewValue}>{designDescription}</p>
              <p className={s.reviewValue} style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                {[
                  preferDarkMode && "Dark mode",
                  wantBlog && "Blog",
                  wantCaseStudies && "Case studies",
                ]
                  .filter(Boolean)
                  .join(", ") || "No extra options selected"}
              </p>
            </div>

            {error && <div className={s.error}>{error}</div>}
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className={s.container}>
      {/* Loading overlay */}
      {loading && (
        <div className={s.loadingOverlay}>
          <div className={s.spinner} />
          <p className={s.loadingText}>Generating your website...</p>
          <p className={s.loadingSub}>This usually takes 15-30 seconds</p>
        </div>
      )}

      {/* Header */}
      <div className={s.header}>
        <Link href="/" className={s.backLink}>
          &larr; Back
        </Link>
        <h1 className={s.title}>Create your website</h1>
        <p className={s.subtitle}>
          Step {step + 1} of {STEPS.length} &mdash; {STEPS[step]}
        </p>
      </div>

      {/* Progress bar */}
      <div className={s.progressBar}>
        <div
          className={s.progressFill}
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === STEPS.length - 1) {
            handleGenerate();
          } else {
            setStep((prev) => prev + 1);
          }
        }}
      >
        {renderStep()}

        {/* Navigation */}
        <div className={s.nav}>
          {step > 0 ? (
            <button
              type="button"
              className={s.navBtn}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
          ) : (
            <div className={s.navSpacer} />
          )}
          <button
            type="submit"
            className={`${s.navBtn} ${s.navBtnPrimary}`}
            disabled={!canProceed() || loading}
          >
            {step === STEPS.length - 1 ? "Generate Website" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
