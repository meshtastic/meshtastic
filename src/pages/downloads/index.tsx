import React from 'react';

import useSWR from 'swr';

// import { Endpoints } from '@octokit/types';
import Layout from '@theme/Layout';

import { Release } from '../../utils/github';
import { fetcher } from '../../utils/swr';
import {
  FirmwareCard,
  PlaceholderFirmwareCard,
} from './_components/FirmwareCard';
import { HeaderText } from './_components/HeaderText'

const Firmware = (): JSX.Element => {
  const { data, error } = useSWR<Release[]>(
    "https://api.github.com/repos/meshtastic/meshtastic-device/releases",
    fetcher
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
          <HeaderText
            type="h1"
            text="Downloads"
          />
        </div>
        <div className="container">
          <HeaderText
            type="h2"
            text="Install Meshtastic"
            link=""
          />
        </div>
        <div className="container">
          <HeaderText
            type="h2"
            text="Mobile Downloads"
            link="mobile-downloads"
          />
        </div>
        <div className="container">
          <HeaderText
            type="h2"
            text="Advanced"
            link="advanced"
          />
          <HeaderText
            type="h3"
            text="Firmware Downloads"
            link="firmware-downloads"
          />
          <ul
            style={{
              position: "relative",
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              paddingLeft: "0",
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
                  <div className="card__footer" style={{ marginTop: "1rem" }}>
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
          <HeaderText
            type="h3"
            text="Sideload Android"
            link="sideload-android"
          />
        </div>
      </main>
    </Layout>
  );
};

export default Firmware;
