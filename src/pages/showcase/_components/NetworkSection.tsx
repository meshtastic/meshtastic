import React from 'react';

import { Showcase } from '../../../utils/apiTypes';
import { Card, PlaceholderCard } from './Card';

interface NetworkSectionProps {
  title: string;
  icon?: JSX.Element;
  iconColor?: string;
  networks?: Showcase[];
}

export const NetworkSection = ({
  title,
  icon,
  iconColor,
  networks,
}: NetworkSectionProps): JSX.Element => {
  return (
    <div className="container margin-top--lg">
      <div
        className="margin-bottom--sm"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2>{title}</h2>
        {icon && (
          <span
            style={{
              marginBottom: "0.5rem",
              marginLeft: "0.5rem",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              color: iconColor,
            }}
          >
            {icon}
          </span>
        )}
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
        {networks ? (
          <>
            {networks.map((network) => (
              <Card key={network.title} network={network} />
            ))}
            {networks.length === 0 && <h2>No result</h2>}
          </>
        ) : (
          <div>
            <PlaceholderCard />
          </div>
        )}
      </ul>
    </div>
  );
};
