import * as LucideIcons from "lucide-react";

interface IconResolverProps {
  name: string;
  size?: number;
  className?: string;
}

export default function IconResolver({ name, size = 24, className }: IconResolverProps) {
  // Convert kebab-case or camelCase to PascalCase for Lucide lookup
  const pascalName = name
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as any;
  const Icon = icons[pascalName];

  if (!Icon || typeof Icon !== "function") {
    return <LucideIcons.Circle size={size} className={className} />;
  }

  return <Icon size={size} className={className} />;
}
