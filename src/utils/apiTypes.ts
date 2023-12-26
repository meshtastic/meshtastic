export interface DeviceFirmwareResource {
  id: string;
  title: string;
  page_url?: string;
  zip_url?: string;
}

export interface FirmwareReleases {
  releases: {
    stable: DeviceFirmwareResource[];
    alpha: DeviceFirmwareResource[];
  };
  pullRequests: DeviceFirmwareResource[];
}
