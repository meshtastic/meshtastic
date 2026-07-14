import { translate } from "@docusaurus/Translate";

const features = [
  {
    title: translate({
      id: "homepage.features.longRange.title",
      message: "Long Range",
    }),
    description: translate({
      id: "homepage.features.longRange.description",
      message:
        "LoRa technology enables communication over several kilometers",
    }),
  },
  {
    title: translate({
      id: "homepage.features.encrypted.title",
      message: "Encrypted",
    }),
    description: translate({
      id: "homepage.features.encrypted.description",
      message: "AES-256 encryption keeps your messages private and secure",
    }),
  },
  {
    title: translate({
      id: "homepage.features.noInfrastructure.title",
      message: "No Infrastructure",
    }),
    description: translate({
      id: "homepage.features.noInfrastructure.description",
      message: "Works without cell towers, WiFi, or internet connectivity",
    }),
  },
];

export function HomepageFeatures() {
  return (
    <section
      aria-label={translate({
        id: "homepage.features.ariaLabel",
        message: "Features",
      })}
      className="mt-16"
    >
      <h2 className="sr-only">
        {translate({
          id: "homepage.features.heading",
          message: "Key Features",
        })}
      </h2>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl border border-border/50 border-l-4 border-l-primary bg-card p-6 shadow-lg shadow-foreground/5 backdrop-blur-md hover:border-primary/30 hover:opacity-90 transition-all"
          >
            <h3 className="font-mono text-lg font-bold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-base text-muted-foreground">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
