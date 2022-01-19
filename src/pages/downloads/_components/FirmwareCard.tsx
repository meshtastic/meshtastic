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

export const PlaceholderFirmwareCard = (): JSX.Element => {
  return (
    <div
      className="card"
      style={{
        width: "100%",
        animation: "pulse 2s infinite",
        transform: "scale(1)",
        display: "flex",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            borderRadius: "0.4rem",
            backgroundColor: "gray",
            height: "2rem",
            width: "8rem",
          }}
        />
        <div
          style={{
            borderRadius: "0.4rem",
            backgroundColor: "gray",
            marginTop: "1rem",
            height: "1rem",
            width: "8rem",
          }}
        />
      </div>
      <div
        className="card__body"
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          height: "3rem",
        }}
      />
      <a className="button disabled button--primary button--block">&nbsp;</a>
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "8rem",
          height: "2rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "11rem",
          height: "1rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "9rem",
          height: "1rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "13rem",
          height: "1rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "11rem",
          height: "1rem",
        }}
      />
    </div>
  );
};
