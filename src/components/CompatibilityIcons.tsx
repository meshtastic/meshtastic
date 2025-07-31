// src/components/CompatibilityIcons.tsx
import compatibility from "@site/static/data/config_compatibility.json";
import { PlatformIcon } from "./PlatformIcon";

const allPlatforms = ["apple", "android", "web", "cli", "mui", "baseui"];

export const CompatibilityIcons = ({ configKey }: { configKey: string }) => {
  const compat = compatibility[configKey];
  if (!compat) return null;

  return (
    <span className="compatibility-icons">
      {allPlatforms.map((platform) =>
        compat[platform] ? (
          <PlatformIcon key={platform} type={platform} />
        ) : null,
      )}
    </span>
  );
};
