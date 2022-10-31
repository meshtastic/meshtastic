import React from 'react';

import { FaAndroid, FaApple } from 'react-icons/fa';
import useSWR from 'swr';

import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';
import Layout from '@theme/Layout';

import { Release } from '../../utils/github';
import { fetcher } from '../../utils/swr';
import {
  FirmwareCard,
  PlaceholderFirmwareCard,
} from './_components/FirmwareCard';

const Firmware = (): JSX.Element => {
  const { data, error } = useSWR<Release[]>(
    'https://api.github.com/repos/meshtastic/firmware/releases',
    fetcher,
  );

  const beta = data?.filter((release) => release.prerelease === false);

  const alpha = data?.filter((release) => release.prerelease === true);
  return (
    <Layout
      title="Downloads"
      description="Downloads for the Meshtastic project"
    >
      <div className="container mt-8 flex flex-col gap-3">
        <h1 className="m-2">Flasher</h1>
        <div className="flex h-48 w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-green-500 to-primary">
            <BoltIcon className="m-auto h-20" />
          </div>
          <div className="w-full bg-primary">
            <div className="m-auto mt-8 w-96">
              <h3>Meshtastic Flasher</h3>
              <p className="mb-3">
                Desktop application to flash fimware to your devices.
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/meshtastic/Meshtastic-gui-installer/releases/latest"
                className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
              >
                Download
                <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
              </a>
            </div>
          </div>
        </div>
        {/*  */}
        <h1 className="m-2">Apps</h1>
        <div className="flex h-48 w-full overflow-hidden rounded-xl">
          <div className="flex w-1/5 bg-gradient-to-r from-rose-500 to-primary">
            <ComputerDesktopIcon className="m-auto h-20" />
          </div>
          <div className="flex w-full bg-primary">
            <div className="flex w-1/3 p-4">
              <div className="flex flex-grow rounded-md border-2 border-secondary bg-primary shadow-md hover:brightness-90">
                <div className="m-auto">
                  <FaApple className="h-20 w-20" />
                </div>
                <div className="m-auto flex flex-col gap-3">
                  <h2>Apple</h2>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://testflight.apple.com/join/c8nNl8q1"
                    className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                  >
                    App Store
                    <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex w-1/3 p-4">
              <div className="relative flex flex-grow rounded-md border-2 border-secondary bg-primary shadow-md hover:brightness-90">
                <div className="m-auto">
                  <FaAndroid className="h-20 w-20" />
                </div>
                <div className="m-auto flex flex-col gap-3">
                  <h2>Android</h2>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://play.google.com/store/apps/details?id=com.geeksville.mesh&referrer=utm_source=downloads-page"
                    className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                  >
                    Play Store
                    <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                  </a>
                  <a
                    className="absolute bottom-2 flex"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://mesh.tastic.app/fdroid/repo"
                  >
                    F-Droid
                    <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex w-1/3 p-4">
              <div className="flex flex-grow rounded-md border-2 border-secondary bg-primary shadow-md hover:brightness-90">
                <div className="m-auto">
                  <GlobeAltIcon className="h-20 w-20" />
                </div>
                <div className="m-auto flex flex-col gap-3">
                  <h2>Web</h2>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://client.meshtastic.org"
                    className="m-auto flex rounded-lg border-4 border-transparent bg-accent p-1 font-semibold text-black shadow-md hover:text-black hover:brightness-110 active:border-green-200"
                  >
                    meshtastic.org
                    <ArrowTopRightOnSquareIcon className="m-auto ml-2 h-4" />
                  </a>
                </div>
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
          <div className="flex w-full bg-primary">
            {data && !error ? (
              <>
                <FirmwareCard
                  variant="Beta"
                  description="Tested feature set. For those who want stability."
                  release={beta}
                />
                <FirmwareCard
                  variant="Alpha"
                  description="Upcoming changes for testing. For those who want new features."
                  release={alpha}
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
                  <div className="card__footer" style={{ marginTop: '1rem' }}>
                    <a
                      href="https://nightly.link/meshtastic/firmware/workflows/main/master/built.zip"
                      className="button button--secondary button--block"
                    >
                      Download
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
      {/*  */}
      {/* <main className="margin-vert--xl">
       
       
        <div className="container">
          <HeaderText
            type="h2"
            text="Firmware Downloads"
            link="firmware-downloads"
          />
          <ul
            style={{
              position: 'relative',
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              paddingLeft: '0',
            }}
          >
            
          </ul>
          Once downloaded, follow the flashing instructions for{' '}
          <a
            href="/docs/getting-started/flashing-firmware/flashing-esp32"
            rel="noreferrer"
            target="_blank"
          >
            ESP32 chipsets
          </a>
          ,{' '}
          <a
            href="/docs/getting-started/flashing-firmware/flashing-nrf52"
            rel="noreferrer"
            target="_blank"
          >
            NRF52 chipsets
          </a>
          , or the{' '}
          <a
            href="/docs/getting-started/flashing-firmware/meshtastic-flasher"
            rel="noreferrer"
            target="_blank"
          >
            GUI instructions for Meshtastic Flasher
          </a>
          .
        </div>
        <div className="container">
          <i>
            Google Play and the Google Play logo are trademarks of Google LLC.
          </i>
        </div>
      </main> */}
    </Layout>
  );
};

export default Firmware;
