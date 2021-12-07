import React from 'react';

import { Endpoints } from '@octokit/types';

export interface FirmwareCardProps {
  variant: string;
  description: string;
  firmware: Endpoints["GET /repos/{owner}/{repo}/releases"]["response"]["data"];
}

export const FirmwareCard = ({
  variant,
  description,
  firmware,
}: FirmwareCardProps): JSX.Element => {
  return (
    <div className="card">
      <div
        className="card__header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>{variant}</h3>
        {firmware?.length && (
          <a href={firmware[0].html_url}>{firmware[0].name}</a>
        )}
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
      <div className="card__footer">
        {firmware?.length ? (
          <>
            <a
              href={firmware[0].assets[1]?.browser_download_url}
              className="button button--secondary button--block"
            >
              Download
            </a>
            <div className="margin-top--sm">
              <h3>Older versions</h3>
              {firmware.slice(1, 6).map((release) => {
                return (
                  <div key={release.id}>
                    <a href={release.assets[1]?.browser_download_url}>
                      {release.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <button disabled className="button button--secondary button--block">
            Loading...
          </button>
        )}
      </div>
    </div>
  );
};
