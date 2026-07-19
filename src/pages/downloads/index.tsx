import type { JSX } from "react";
import { FaAndroid, FaApple } from "react-icons/fa";
import useSwr from "swr";

import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";

import type { FirmwareReleases } from "../../utils/apiTypes.ts";
import { fetcher } from "../../utils/swr.ts";
import {
  FirmwareCard,
  PlaceholderFirmwareCard,
} from "./_components/FirmwareCard.tsx";

const Firmware = (): JSX.Element => {
  const { data, error } = useSwr<FirmwareReleases>(
    "https://api.meshtastic.org/github/firmware/list",
    fetcher,
  );

  return (
    <Layout
      title={translate({
        id: "downloads.title",
        message: "Downloads",
      })}
      description={translate({
        id: "downloads.description",
        message: "Downloads for the Meshtastic project",
      })}
    >
      <div className="container mt-8 flex flex-col gap-3">
        <h1 className="m-2">
          <Translate id="downloads.flasher.heading">Flasher</Translate>
        </h1>
        <div className="flex w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-green-500 to-primary">
            <BoltIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full flex-col bg-primary xl:flex-row">
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>
                  <Translate id="downloads.flasher.webFlasher">
                    Web Flasher
                  </Translate>
                </h3>
              </div>
              <div className="card__body">
                <p>
                  <Translate id="downloads.flasher.webFlasherDescription">
                    Web based flasher for easy device flashing with Chrome and
                    Edge Browser. Works with all major device architectures.
                  </Translate>
                </p>
              </div>
              <div className="card__footer mt-auto">
                <a
                  href="https://flasher.meshtastic.org/"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  <Translate id="downloads.flasher.goToWebFlasher">
                    Go to Web Flasher
                  </Translate>
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
            <div className="card m-4 border-2 border-secondary w-full">
              <div className="card__header">
                <h3>
                  <Translate id="downloads.flasher.dragAndDrop">
                    nRF52/RP2040/RP2350 Drag & Drop
                  </Translate>
                </h3>
              </div>
              <div className="card__body">
                <p>
                  <Translate id="downloads.flasher.dragAndDropDescription">
                    Devices such as T-Echo, RAK4631, and RAK11300 are flashed
                    via filesystem. Use the web flasher to download applicable
                    firmware.
                  </Translate>
                </p>
              </div>
              <div className="card__footer mt-auto">
                <a
                  href="https://flasher.meshtastic.org/"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  <Translate id="downloads.flasher.goToFlasher">
                    Go to Flasher
                  </Translate>
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <h2 className="m-2">
          <Translate id="downloads.apps.heading">Apps</Translate>
        </h2>
        <div className="flex w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-rose-500 to-primary">
            <ComputerDesktopIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full columns-3 flex-col bg-primary lg:flex-row">
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>
                  <Translate id="downloads.apps.apple">Apple</Translate>
                </h3>
              </div>
              <div className="card__body flex items-center">
                <div className="m-auto">
                  <FaApple className="h-20 w-20" />
                </div>
              </div>
              <div className="card__body">
                <Translate id="downloads.apps.appleDescription">
                  Available on iOS, iPadOS and macOS. The last two major OS
                  versions are supported.
                </Translate>
              </div>
              <div className="card__footer mt-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1586432531"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  <Translate id="downloads.apps.appStore">App Store</Translate>
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>
                  <Translate id="downloads.apps.android">Android</Translate>
                </h3>
              </div>
              <div className="card__body flex items-center">
                <div className="m-auto">
                  <FaAndroid className="h-20 w-20" />
                </div>
              </div>
              <div className="card__body">
                <Translate id="downloads.apps.androidSideloading">
                  Sideloading also available.
                </Translate>
              </div>
              <div className="card__footer mt-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://f-droid.org/packages/com.geeksville.mesh/"
                  className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  <Translate id="downloads.apps.fdroid">F-Droid</Translate>
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.geeksville.mesh&referrer=utm_source=downloads-page"
                  className="mt-4 flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                >
                  <Translate id="downloads.apps.playStore">
                    Play Store
                  </Translate>
                  <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                </a>
              </div>
            </div>
            <div className="card m-4 border-2 border-secondary">
              <div className="card__header">
                <h3>
                  <Translate id="downloads.apps.web">Web</Translate>
                </h3>
              </div>
              <div className="card__body flex items-center">
                <div className="m-auto">
                  <GlobeAltIcon className="h-20 w-20" />
                </div>
              </div>
              <div className="card__body">
                <Translate id="downloads.apps.webDescription">
                  Requires Chromium based browsers.
                </Translate>
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
        <h2 className="m-2">
          <Translate id="downloads.firmware.heading">Firmware</Translate>
        </h2>
        <div className="flex w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-orange-500 to-primary">
            <CpuChipIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full flex-col bg-primary lg:flex-row">
            {data && !error ? (
              <>
                <FirmwareCard
                  variant="Stable"
                  description={translate({
                    id: "downloads.firmware.stableDescription",
                    message:
                      "Tested feature set. For those who want stability.",
                  })}
                  release={data.releases.stable}
                />
                <FirmwareCard
                  variant="Alpha"
                  description={translate({
                    id: "downloads.firmware.alphaDescription",
                    message:
                      "Upcoming changes for testing. For those who want new features.",
                  })}
                  release={data.releases.alpha}
                />
                <div className="card m-4 border-2 border-secondary">
                  <div className="card__header">
                    <h3>
                      <Translate id="downloads.firmware.bleeding">
                        Bleeding
                      </Translate>
                    </h3>
                  </div>
                  <div className="card__body">
                    <p>
                      <Translate id="downloads.firmware.bleedingDescription">
                        Latest successful CI build. For those who want to break
                        things.
                      </Translate>
                    </p>
                  </div>
                  <div className="card__footer mt-auto">
                    <a
                      href="https://nightly.link/meshtastic/firmware/workflows/main_matrix/master"
                      className="button button--secondary button--block"
                    >
                      <Translate id="downloads.firmware.downloadBleeding">
                        Download Bleeding
                      </Translate>
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
      </div>
    </Layout>
  );
};

export default Firmware;
