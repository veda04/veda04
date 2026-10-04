import { SOCIAL_LINKS } from "@/app/constants";
import { SOCIAL_ICON_MAP } from "@/lib/social-icons";
import IconCircleLink from "@/components/icon-circle-link";

export default function SocialIconLinks({ className = "flex items-center gap-4" }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((social) => (
        <IconCircleLink
          key={social.handle}
          href={social.url}
          icon={SOCIAL_ICON_MAP[social.icon as keyof typeof SOCIAL_ICON_MAP]}
          label={social.label}
        />
      ))}
    </div>
  );
}
