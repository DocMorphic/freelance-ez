import type { TeamSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./Team.module.css";

interface Props {
  config: TeamSectionConfig;
}

/** Variant 0 — Cards grid with icon circle, name, role, optional bio */
export default function TeamVariant0({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Cards grid */}
      <div className={styles.teamGrid}>
        {config.members.map((member, i) => (
          <div key={i} className={`t-card ${styles.memberCard}`}>
            <div className={styles.memberIconCircle}>
              <IconResolver name={member.icon || "user"} size={32} />
            </div>
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.role}</p>
            {member.bio && <p className={styles.memberBio}>{member.bio}</p>}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
