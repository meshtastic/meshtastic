import React, { type CSSProperties } from "react";

interface DeviceImageProps {
  /**
   * The SVG filename from the web-flasher repository
   * e.g., "heltec-v3.svg", "t-deck.svg", "rak4631.svg"
   */
  device: string;
  /**
   * Alt text for accessibility
   */
  alt?: string;
  /**
   * Optional className for styling
   */
  className?: string;
  /**
   * Size preset: 'sm' (80px), 'md' (120px), 'lg' (160px), 'xl' (200px)
   * @default 'md'
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Whether to center the image
   * @default false
   */
  center?: boolean;
  /**
   * Float the image to the left or right
   */
  float?: "left" | "right";
}

const sizeMap = {
  sm: "80px",
  md: "120px",
  lg: "160px",
  xl: "200px",
};

const BASE_URL = "https://flasher.meshtastic.org/img/devices/";

/**
 * DeviceImage component for displaying Meshtastic device SVGs from the web-flasher repository.
 *
 * @example
 * ```mdx
 * import { DeviceImage } from "/src/components/DeviceImage";
 *
 * <DeviceImage device="heltec-v3.svg" alt="Heltec V3" size="lg" />
 * <DeviceImage device="t-deck.svg" alt="LilyGO T-Deck" center />
 * ```
 *
 * Available device images are located at:
 * https://github.com/meshtastic/web-flasher/tree/main/public/img/devices
 */
export function DeviceImage({
  device,
  alt,
  className = "",
  size = "md",
  center = false,
  float,
}: DeviceImageProps) {
  const imageUrl = device.startsWith("http") ? device : `${BASE_URL}${device}`;
  const maxHeight = sizeMap[size];

  const floatStyle: CSSProperties = float
    ? {
        float,
        marginLeft: float === "right" ? "1rem" : undefined,
        marginRight: float === "left" ? "1rem" : undefined,
        marginBottom: "0.5rem",
      }
    : {};

  const containerClass = center
    ? `flex justify-center my-4 ${className}`
    : className;

  return (
    <div className={containerClass} style={{ ...floatStyle, flexShrink: 0 }}>
      <img
        src={imageUrl}
        alt={alt || device.replace(/\.svg$/, "").replace(/-/g, " ")}
        style={{ height: maxHeight, width: "auto", borderRadius: 0 }}
        loading="lazy"
      />
    </div>
  );
}

/**
 * DeviceImageRow component for displaying multiple devices in a row.
 *
 * @example
 * ```mdx
 * import { DeviceImageRow } from "/src/components/DeviceImage";
 *
 * <DeviceImageRow
 *   devices={[
 *     { device: "heltec-v3.svg", alt: "Heltec V3" },
 *     { device: "t-deck.svg", alt: "T-Deck" },
 *     { device: "rak4631.svg", alt: "RAK4631" }
 *   ]}
 * />
 * ```
 */
export function DeviceImageRow({
  devices,
  size = "md",
}: {
  devices: Array<{ device: string; alt?: string }>;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div className="flex flex-wrap justify-center gap-6 my-6">
      {devices.map(({ device, alt }) => (
        <DeviceImage key={device} device={device} alt={alt} size={size} />
      ))}
    </div>
  );
}

/**
 * DeviceShowcase component for displaying a grid of devices with labels.
 * Better suited for overview pages like getting-started and hardware index.
 *
 * @example
 * ```mdx
 * import { DeviceShowcase } from "/src/components/DeviceImage";
 *
 * <DeviceShowcase
 *   devices={[
 *     { device: "t-deck.svg", name: "T-Deck", vendor: "LILYGO" },
 *     { device: "rak_wismesh_tag.svg", name: "WisMesh Tag", vendor: "RAK" },
 *   ]}
 * />
 * ```
 */
export function DeviceShowcase({
  devices,
}: {
  devices: Array<{ device: string; name: string; vendor?: string }>;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "1rem",
        margin: "1.5rem 0",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {devices.map(({ device, name, vendor }) => {
        const imageUrl = device.startsWith("http")
          ? device
          : `${BASE_URL}${device}`;
        return (
          <div
            key={device}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "var(--ifm-background-surface-color)",
              border: "1px solid var(--ifm-color-emphasis-200)",
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              style={{
                height: "80px",
                width: "auto",
                objectFit: "contain",
              }}
              loading="lazy"
            />
            <span
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                textAlign: "center",
                color: "var(--ifm-font-color-base)",
              }}
            >
              {name}
            </span>
            {vendor && (
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "var(--ifm-color-emphasis-600)",
                  textAlign: "center",
                }}
              >
                {vendor}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * DeviceSection component for displaying a device image floated beside a heading.
 * Place this component BEFORE your markdown heading and the image will float
 * to the right while content flows around it.
 *
 * @example
 * ```mdx
 * import { DeviceSection } from "/src/components/DeviceImage";
 *
 * <DeviceSection device="t-deck.svg" />
 *
 * ## [T-Deck](./tdeck/)
 *
 * Standalone device with screen and keyboard.
 *
 * | Name | MCU | Radio |
 * | ... | ... | ... |
 *
 * <div style={{ clear: "both" }} />
 * ```
 */
export function DeviceSection({
  device,
  alt,
  size = "sm",
}: {
  device: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const imageUrl = device.startsWith("http") ? device : `${BASE_URL}${device}`;
  const height = sizeMap[size];

  return (
    <div
      style={{
        float: "right",
        marginLeft: "1rem",
        marginBottom: "0.5rem",
      }}
    >
      <img
        src={imageUrl}
        alt={alt || device.replace(/\.svg$/, "").replace(/-/g, " ")}
        style={{
          height,
          width: "auto",
          objectFit: "contain",
          borderRadius: 0,
        }}
        loading="lazy"
      />
    </div>
  );
}

export default DeviceImage;
