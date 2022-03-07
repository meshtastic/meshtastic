import React from 'react';

import { Showcase } from '../../../utils/apiTypes';
import { mapUrl } from '../../../utils/map';
import { CardTags } from './CardTags';

export interface CardProps {
  network: Showcase;
}

export const Card = React.memo(({ network }: CardProps) => (
  <div className="card">
    <div className="card__image">
      <div style={{ height: "140px" }}>
        <img img={mapUrl(network.nodes ?? [])} alt={network.title} />
      </div>
    </div>
    <div className="card__body">
      <h4>{network.title}</h4>
      <small>{network.summary}</small>
    </div>
    <div className="card__footer">
      <a
        href={`?id=${network.id}`}
        className="button button--primary button--block"
        style={{ marginBottom: "0.5rem" }}
      >
        Read more
      </a>
      <CardTags tags={network.tags} />
    </div>
  </div>
));

export const PlaceholderCard = (): JSX.Element => (
  <div
    className="card"
    style={{
      animation: "pulse 2s infinite",
      transform: "scale(1)",
    }}
  >
    <div className="card__image">
      <div
        style={{
          height: "140px",
        }}
      />
    </div>
    <div className="card__body">
      <div
        style={{
          width: "30%",
          height: "2rem",
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          marginBottom: "1rem",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "1rem",
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          marginBottom: "0.5rem",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "1rem",
          borderRadius: "0.4rem",
          backgroundColor: "gray",
        }}
      />
    </div>
    <div className="card__footer">
      <a
        className="button disabled button--primary button--block"
        style={{ marginBottom: "0.5rem" }}
      >
        &nbsp;
      </a>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "4rem",
            height: "1.5rem",
            borderRadius: "0.4rem",
            backgroundColor: "gray",
          }}
        />
        <div
          style={{
            width: "4rem",
            height: "1.5rem",
            borderRadius: "0.4rem",
            backgroundColor: "gray",
          }}
        />
      </div>
    </div>
  </div>
);
