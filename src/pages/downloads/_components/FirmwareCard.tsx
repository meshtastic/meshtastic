import React from 'react';

import { DeviceFirmwareResource } from '../../../utils/apiTypes.js';

export interface releaseCardProps {
  variant: string;
  description: string;
  release?: DeviceFirmwareResource[];
}

export const FirmwareCard = ({
  variant,
  description,
  release,
}: releaseCardProps): JSX.Element => {
  return (
    <div className="card m-4 border-2 border-secondary">
      <div
        className="card__header"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <h3>{variant}</h3>
        {release?.length && (
          <a href={release[0].page_url}>{release[0].title}</a>
        )}
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
      <div className="card__footer mt-auto">
        <div className="margin-top--sm">
          <details>
            <summary>Older Versions</summary>
            {release.slice(1, 6).map((release) => {
              return (
                <div key={release.id}>
                  <a href={release.zip_url}>{release.title}</a>
                </div>
              );
            })}
          </details>
        </div>
        {release?.length ? (
          <>
            <a
              href={release[0].zip_url}
              className="button button--secondary button--block margin-top--sm"
            >
              Download {variant}
            </a>
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
        width: '100%',
        animation: 'pulse 2s infinite',
        transform: 'scale(1)',
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            borderRadius: '0.4rem',
            backgroundColor: 'gray',
            height: '2rem',
            width: '8rem',
          }}
        />
        <div
          style={{
            borderRadius: '0.4rem',
            backgroundColor: 'gray',
            marginTop: '1rem',
            height: '1rem',
            width: '8rem',
          }}
        />
      </div>
      <div
        className="card__body"
        style={{
          borderRadius: '0.4rem',
          backgroundColor: 'gray',
          height: '3rem',
        }}
      />
      <a className="button disabled button--primary button--block">&nbsp;</a>
      <div
        style={{
          borderRadius: '0.4rem',
          backgroundColor: 'gray',
          width: '8rem',
          height: '2rem',
        }}
      />
      <div
        style={{
          borderRadius: '0.4rem',
          backgroundColor: 'gray',
          width: '11rem',
          height: '1rem',
        }}
      />
      <div
        style={{
          borderRadius: '0.4rem',
          backgroundColor: 'gray',
          width: '9rem',
          height: '1rem',
        }}
      />
      <div
        style={{
          borderRadius: '0.4rem',
          backgroundColor: 'gray',
          width: '13rem',
          height: '1rem',
        }}
      />
      <div
        style={{
          borderRadius: '0.4rem',
          backgroundColor: 'gray',
          width: '11rem',
          height: '1rem',
        }}
      />
    </div>
  );
};
