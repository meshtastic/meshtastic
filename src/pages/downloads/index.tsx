import React from 'react';

import useSWR from 'swr';

// import { Endpoints } from '@octokit/types';
import Layout from '@theme/Layout';

import { Release } from '../../utils/github';
import { fetcher } from '../../utils/swr';
import { DownloadCard } from './_components/DownloadCard';
import {
  FirmwareCard,
  PlaceholderFirmwareCard,
} from './_components/FirmwareCard';
import { HeaderText } from './_components/HeaderText';

const Firmware = (): JSX.Element => {
  const { data, error } = useSWR<Release[]>(
    'https://api.github.com/repos/meshtastic/meshtastic-device/releases',
    fetcher,
  );

  const beta = data?.filter((release) => release.prerelease === false);

  const alpha = data?.filter((release) => release.prerelease === true);
  return (
    <Layout
      title="Downloads"
      description="Downloads for the Meshtastic project"
    >
      <main className="margin-vert--xl">
        <div className="container">
          <HeaderText type="h1" text="Downloads" />
        </div>
        <div className="container">
          <HeaderText
            type="h2"
            text="Install Meshtastic"
            link="install-meshtastic"
          />
          <DownloadCard
            client="Meshtastic Flasher"
            buttonText="Download Meshtastic Flasher"
            url="https://github.com/meshtastic/Meshtastic-gui-installer/releases/latest"
            notes={[
              'To download using ',
              <code>pip</code>,
              ' follow ',
              <a href="/docs/getting-started/flashing-firmware/meshtastic-flasher#install-using-pip">
                these instructions
              </a>,
              '.',
            ]}
          />
        </div>
        <div className="container">
          <HeaderText
            type="h2"
            text="Mobile Downloads"
            link="mobile-downloads"
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
            <DownloadCard
              client="Android"
              imgUrl="https://f-droid.org/badge/get-it-on.png"
              url="https://mesh.tastic.app/fdroid/repo"
              imgUrl2="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              url2="https://play.google.com/store/apps/details?id=com.geeksville.mesh&referrer=utm_source=downloads-page"
              notes={[
                'To sideload, ',
                <a
                  href="https://github.com/meshtastic/Meshtastic-Android/releases/latest"
                  rel="noreferrer"
                  target="_blank"
                >
                  download the latest .apk
                </a>,
                ' from Github',
              ]}
            />
            <DownloadCard
              client="iOS"
              url="https://testflight.apple.com/join/c8nNl8q1"
              buttonText="Download on TestFlight"
              notes="Currently only available in TestFlight"
            />
          </ul>
        </div>
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
                <div className="card">
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
                      href="https://nightly.link/meshtastic/meshtastic-device/workflows/main/master/built.zip"
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
      </main>
    </Layout>
  );
};

export default Firmware;
