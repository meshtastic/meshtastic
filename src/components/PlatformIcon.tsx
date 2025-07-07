import { Icon } from "@iconify/react";

export const PlatformIcon = ({ type }: { type: string }) => {
  const icons: Record<string, string> = {
    apple: "mdi:apple",
    android: "mdi:android",
    web: "mdi:web",
    cli: "mdi:console",
    mui: "mdi:alpha-m-box",
    baseui: "mdi:alpha-b-box",
  };

  const labels: Record<string, string> = {
    apple: "Apple",
    android: "Android",
    web: "Web",
    cli: "CLI",
    mui: "MUI",
    baseui: "BaseUI",
  };

  const icon = icons[type];
  const label = labels[type] || "Unknown";

  if (!icon) return <span title="Unknown">❓</span>;

  return (
    <span title={label}>
      <Icon
        icon={icon}
        width="20"
        height="20"
        color="#67ea94"
        style={{ verticalAlign: "middle" }}
      />
    </span>
  );
};
