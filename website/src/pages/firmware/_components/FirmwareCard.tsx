import React from 'react';

import { Release } from '@site/src/utils/github';

export interface releaseCardProps {
  variant: string;
  description: string;
  release?: Release[];
}

export const FirmwareCard = ({
  variant,
  description,
  release,
}: releaseCardProps): JSX.Element => {
  return (
    <div className="card">
      <div
        className="card__header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>{variant}</h3>
        {release?.length && <a href={release[0].html_url}>{release[0].name}</a>}
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
      <div className="card__footer">
        {release?.length ? (
          <>
            <a
              href={release[0].assets[1]?.browser_download_url}
              className="button button--secondary button--block"
            >
              Download
            </a>
            <div className="margin-top--sm">
              <h3>Older versions</h3>
              {release.slice(1, 6).map((release) => {
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
