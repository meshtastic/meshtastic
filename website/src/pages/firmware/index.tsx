import React from 'react';

import Layout from '@theme/Layout';

const Firmware = (): JSX.Element => {
  return (
    <Layout
      title="Firmware"
      description="Firmware download for the Meshtastic project"
    >
      <main className="margin-vert--xl">
        <div className="container">
          {/*  */}
          <div
            className="margin-bottom--sm"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>Stable</h2>
          </div>
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
            <div className="card">
              <div className="card__header">
                <h3>Beta</h3>
              </div>
              <div className="card__body">
                <p>Tested feature set. For those who want stability.</p>
              </div>
              <div className="card__footer">
                <button className="button button--secondary button--block">
                  See All
                </button>
              </div>
            </div>

            {/*  */}
            {/*  */}
            <div className="card">
              <div className="card__header">
                <h3>Alpha</h3>
              </div>
              <div className="card__body">
                <p>
                  Upcomming changes for testing. For those who want new
                  features.
                </p>
              </div>
              <div className="card__footer">
                <button className="button button--secondary button--block">
                  See All
                </button>
              </div>
            </div>

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
              <div className="card__footer">
                <button className="button button--secondary button--block">
                  See All
                </button>
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
