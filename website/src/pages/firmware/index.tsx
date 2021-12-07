import React from 'react';

import { Octokit } from '@octokit/rest';
import { Endpoints } from '@octokit/types';
import Layout from '@theme/Layout';

import { FirmwareCard } from './_components/FirmwareCard';

const Firmware = (): JSX.Element => {
  const gh = new Octokit();

  const [releases, setReleases] =
    React.useState<
      Endpoints["GET /repos/{owner}/{repo}/releases"]["response"]
    >();

  gh.repos
    .listReleases({
      owner: "meshtastic",
      repo: "meshtastic-device",
    })
    .then((response) => {
      if (response.data) {
        setReleases(response);
      }
    });

  const beta = releases?.data.filter((release) => release.prerelease === false);

  const alpha = releases?.data.filter((release) => release.prerelease === true);
  return (
    <Layout
      title="Firmware"
      description="Firmware download for the Meshtastic project"
    >
      <main className="margin-vert--xl">
        <div className="container">
          <ul
            style={{
              position: "relative",
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              paddingLeft: "0",
            }}
          >
            {/*  */}
            <FirmwareCard
              variant="Beta"
              description="Tested feature set. For those who want stability."
              firmware={beta}
            />
            <FirmwareCard
              variant="Alpha"
              description="Upcomming changes for testing. For those who want new features."
              firmware={alpha}
            />

            {/*  */}
            {/*  */}
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

            {/*  */}
          </ul>
        </div>
      </main>
    </Layout>
  );
};

export default Firmware;
