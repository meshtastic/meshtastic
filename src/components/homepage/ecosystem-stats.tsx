import stats from "@/data/ecosystem-stats.json";
import { useNumberAnimation } from "@/hooks/use-number-animation";
import { GlobeIcon, SmartphoneIcon, UserIcon, UsersIcon } from "lucide-react";
import type React from "react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  countUp?: boolean;
}

function StatItem({ icon, value, label, suffix, countUp }: StatItemProps) {
  const displayValue = useNumberAnimation(countUp ? value : 0, 4000);
  const finalValue = countUp ? displayValue : value;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="relative flex w-fit place-items-center gap-3">
          <div className="rounded-lg bg-primary/10 text-primary">{icon}</div>
          <div className="font-mono text-2xl font-bold text-foreground">
            {finalValue.toLocaleString()}
            {suffix && <span className="text-primary ml-1">{suffix}</span>}
          </div>
        </div>
        <div className="mt-1 text-base text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export function EcosystemStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatItem
        icon={<SmartphoneIcon className="size-6" />}
        value={stats.communityDevices}
        label="Community Supported Devices"
        suffix="+"
        countUp={true}
      />
      <StatItem
        icon={<UserIcon className="size-6" />}
        value={stats.contributors}
        label="Code Contributors Worldwide"
        suffix="+"
        countUp={true}
      />
      <StatItem
        icon={<GlobeIcon className="size-6" />}
        value={stats.regions}
        label="LoRa Regions"
      />
      <StatItem
        icon={<UsersIcon className="size-6" />}
        value={stats.languages}
        label="Languages Available"
      />
    </div>
  );
}
