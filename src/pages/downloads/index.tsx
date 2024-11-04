import { FaAndroid, FaApple } from "react-icons/fa";
import useSwr from "swr";

import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  DocumentIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import Layout from "@theme/Layout";

import type { FirmwareReleases } from "../../utils/apiTypes";
import { fetcher } from "../../utils/swr";
import {
  FirmwareCard,
  PlaceholderFirmwareCard,
} from "./_components/FirmwareCard";

const Firmware = (): JSX.Element => {
  const { data, error } = useSwr<FirmwareReleases>(
    "https://api.meshtastic.org/github/firmware/list",
    fetcher,
  );

  return (
    <Layout
      title="Downloads"
      description="Downloads for the Meshtastic project"
    >
      <div className="container mt-8 flex flex-col gap-3">
        <h1 className="m-2">Flasher</h1>
        <div className="flex w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-green-500 to-primary">
            <BoltIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full flex-col bg-primary xl:flex-row">
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>Web Flasher</h3>
              </div>
              <div className="card__body">
                <p>
                  Web based flasher for easy device flashing with Chrome and
                  Edge Browser. Works with all major device architectures.
                </p>
              </div>
              <div className="card__footer mt-auto">
                <a
                  href="https://flasher.meshtastic.org/"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  Go to Web Flasher
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
            <div className="card m-4 border-2 border-secondary w-full">
              <div className="card__header">
                <h3>nRF52/RP2040 Drag & Drop</h3>
              </div>
              <div className="card__body">
                <p>
                  Devices such as T-Echo, RAK4631, and RAK11300 are flashed via
                  filesystem. Use the web flasher to download applicable
                  firmware.
                </p>
              </div>
              <div className="card__footer mt-auto">
                <a
                  href="https://flasher.meshtastic.org/"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  Go to Flasher
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <h1 className="m-2">Apps</h1>
        <div className="flex w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-rose-500 to-primary">
            <ComputerDesktopIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full columns-3 flex-col bg-primary lg:flex-row">
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>Apple</h3>
              </div>
              <div className="card__body flex items-center">
                <div className="m-auto">
                  <FaApple className="h-20 w-20" />
                </div>
              </div>
              <div className="card__body">
                Available on iOS, iPadOS and macOS. The last two major OS
                versions are supported.
              </div>
              <div className="card__footer mt-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1586432531"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  App Store
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>Android</h3>
              </div>
              <div className="card__body flex items-center">
                <div className="m-auto">
                  <FaAndroid className="h-20 w-20" />
                </div>
              </div>
              <div className="card__body">Sideloading also available.</div>
              <div className="card__footer mt-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://meshtastic.org/docs/software/android/installation"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  F-Droid
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.geeksville.mesh&referrer=utm_source=downloads-page"
                  className="mt-4 flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  Play Store
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>Web</h3>
              </div>
              <div className="card__body flex items-center">
                <div className="m-auto">
                  <GlobeAltIcon className="h-20 w-20" />
                </div>
              </div>
              <div className="card__body">
                Requires Chromium based browsers.
              </div>
              <div className="card__footer mt-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://client.meshtastic.org"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  client.meshtastic.org
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <h1 className="m-2">Firmware</h1>
        <div className="flex w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-orange-500 to-primary">
            <CpuChipIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full flex-col bg-primary lg:flex-row">
            {data && !error ? (
              <>
                <FirmwareCard
                  variant="Stable"
                  description="Tested feature set. For those who want stability."
                  release={data.releases.stable}
                />
                <FirmwareCard
                  variant="Alpha"
                  description="Upcoming changes for testing. For those who want new features."
                  release={data.releases.alpha}
                />
                <div className="card m-4 border-2 border-secondary">
                  <div className="card__header">
                    <h3>Bleeding</h3>
                  </div>
                  <div className="card__body">
                    <p>
                      Latest successful CI build. For those who want to break
                      things.
                    </p>
                  </div>
                  <div className="card__footer mt-auto">
                    <a
                      href="https://nightly.link/meshtastic/firmware/workflows/main_matrix/master"
                      className="button button--secondary button--block"
                    >
                      Download Bleeding
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <PlaceholderFirmwareCard />
                <PlaceholderFirmwareCard />
                <PlaceholderFirmwareCard />
              </>
            )}
          </div>
        </div>
        {/*  */}
        <h1 className="m-2">Documentation</h1>
        <div className="flex w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-blue-500 to-primary">
            <DocumentIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full flex-col bg-primary lg:flex-row">
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>PDF</h3>
              </div>
              <div className="card__body flex items-center">
                <div className="m-auto">
                  <GlobeAltIcon className="h-20 w-20" />
                </div>
              </div>
              <div className="card__body">
                Current Meshtastic.org documentation compiled for offline use
              </div>
              <div className="card__footer mt-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/meshtastic/artifacts/tree/docs"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-gray-100 p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  GitHub
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Firmware;
