import type { TeamSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./Team.module.css";

interface Props {
  config: TeamSectionConfig;
}

/** Variant 1 — List with descriptions. Icon + name/role left, bio right. */
export default function TeamVariant1({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* List */}
      <div className={styles.teamList}>
        {config.members.map((member, i) => (
          <div key={i} className={styles.memberRow}>
            <div className={styles.memberRowLeft}>
              <div className={styles.memberRowIcon}>
                <IconResolver name={member.icon || "user"} size={24} />
              </div>
              <div className={styles.memberRowInfo}>
                <span className={styles.memberRowName}>{member.name}</span>
                <span className={styles.memberRowRole}>{member.role}</span>
              </div>
            </div>
            {member.bio && (
              <p className={styles.memberRowBio}>{member.bio}</p>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
