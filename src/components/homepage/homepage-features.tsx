import React from "react";

const features = [
  {
    title: "Long Range",
    description: "LoRa technology enables communication over several kilometers",
  },
  {
    title: "Encrypted",
    description: "AES-256 encryption keeps your messages private and secure",
  },
  {
    title: "No Infrastructure",
    description: "Works without cell towers, WiFi, or internet connectivity",
  },
];

export function HomepageFeatures() {
  return (
    <section aria-label="Features" className="mt-16">
      <h2 className="sr-only">Key Features</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-border/50 border-l-4 border-l-primary bg-card p-6 shadow-lg shadow-foreground/5 backdrop-blur-md hover:border-primary/30 hover:opacity-90 transition-all"
          >
            <h3 className="font-mono text-lg font-bold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-base text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
