import type { FontPairing } from "@/types/site-config";

export interface FontPairDefinition {
  id: FontPairing;
  label: string;
  heading: string;
  headingFallback: string;
  body: string;
  bodyFallback: string;
  description: string;
  // Google Fonts family strings for import
  googleHeading: string;
  googleBody: string;
}

export const FONT_PAIRINGS: Record<FontPairing, FontPairDefinition> = {
  "playfair-inter": {
    id: "playfair-inter",
    label: "Playfair + Inter",
    heading: "Playfair Display",
    headingFallback: "Georgia, serif",
    body: "Inter",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Classic luxury editorial",
    googleHeading: "Playfair+Display:wght@400;600;700",
    googleBody: "Inter:wght@400;500;600;700",
  },

  "dm-serif-dm-sans": {
    id: "dm-serif-dm-sans",
    label: "DM Serif + DM Sans",
    heading: "DM Serif Display",
    headingFallback: "Georgia, serif",
    body: "DM Sans",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Editorial elegance",
    googleHeading: "DM+Serif+Display:wght@400",
    googleBody: "DM+Sans:wght@400;500;600;700",
  },

  "montserrat-open-sans": {
    id: "montserrat-open-sans",
    label: "Montserrat + Open Sans",
    heading: "Montserrat",
    headingFallback: "Arial, sans-serif",
    body: "Open Sans",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Modern corporate",
    googleHeading: "Montserrat:wght@400;600;700",
    googleBody: "Open+Sans:wght@400;500;600;700",
  },

  "raleway-lato": {
    id: "raleway-lato",
    label: "Raleway + Lato",
    heading: "Raleway",
    headingFallback: "Arial, sans-serif",
    body: "Lato",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Clean professional",
    googleHeading: "Raleway:wght@400;600;700",
    googleBody: "Lato:wght@400;500;700",
  },

  "merriweather-source-sans": {
    id: "merriweather-source-sans",
    label: "Merriweather + Source Sans",
    heading: "Merriweather",
    headingFallback: "Georgia, serif",
    body: "Source Sans 3",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Trust & authority",
    googleHeading: "Merriweather:wght@400;700",
    googleBody: "Source+Sans+3:wght@400;500;600;700",
  },

  "space-grotesk-inter": {
    id: "space-grotesk-inter",
    label: "Space Grotesk + Inter",
    heading: "Space Grotesk",
    headingFallback: "Arial, sans-serif",
    body: "Inter",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Tech / startup",
    googleHeading: "Space+Grotesk:wght@400;600;700",
    googleBody: "Inter:wght@400;500;600;700",
  },

  "libre-baskerville-nunito": {
    id: "libre-baskerville-nunito",
    label: "Libre Baskerville + Nunito",
    heading: "Libre Baskerville",
    headingFallback: "Georgia, serif",
    body: "Nunito Sans",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Refined warmth",
    googleHeading: "Libre+Baskerville:wght@400;700",
    googleBody: "Nunito+Sans:wght@400;500;600;700",
  },

  "poppins-work-sans": {
    id: "poppins-work-sans",
    label: "Poppins + Work Sans",
    heading: "Poppins",
    headingFallback: "Arial, sans-serif",
    body: "Work Sans",
    bodyFallback: "-apple-system, BlinkMacSystemFont, sans-serif",
    description: "Friendly modern",
    googleHeading: "Poppins:wght@400;600;700",
    googleBody: "Work+Sans:wght@400;500;600;700",
  },
};
