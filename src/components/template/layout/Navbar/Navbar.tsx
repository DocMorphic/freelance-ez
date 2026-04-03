import type { NavbarConfig } from "@/types/site-config";
import NavbarStandard from "./NavbarStandard";
import NavbarCentered from "./NavbarCentered";
import NavbarMinimal from "./NavbarMinimal";

export interface NavbarProps {
  config: NavbarConfig;
  companyName: string;
  onNavigate?: (slug: string) => void;
}

const variants = {
  standard: NavbarStandard,
  centered: NavbarCentered,
  minimal: NavbarMinimal,
} as const;

export default function Navbar({ config, companyName, onNavigate }: NavbarProps) {
  const Component = variants[config.variant];
  return <Component config={config} companyName={companyName} onNavigate={onNavigate} />;
}
