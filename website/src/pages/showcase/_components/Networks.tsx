import React from 'react';

import { FiHeart, FiSearch } from 'react-icons/fi';

import { useFilteredNetworks } from '../../../hooks/useFilteredNetworks';
import { useSelectedTags } from '../../../hooks/useSelectedTags';
import { ShowcaseNetwork, sortedNetworks } from '../../../utils/showcase';
import { Card } from './Card';

interface NetworkSectionProps {
  title: string;
  icon?: JSX.Element;
  iconColor?: string;
  networks: ShowcaseNetwork[];
}

const NetworkSection = ({
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
        {networks.map((network) => (
          <Card key={network.title} showcaseNetwork={network} />
        ))}
        {networks.length === 0 && <h2>No result</h2>}
      </ul>
    </div>
  );
};

export const Networks = (): JSX.Element => {
  const [sorted, setSorted] = React.useState<ShowcaseNetwork[]>([]);
  const [other, setOther] = React.useState<ShowcaseNetwork[]>([]);

  sortedNetworks.then((networks) => {
    setSorted(networks.filter((network) => network.tags.includes("favorite")));
  });
  sortedNetworks.then((networks) => {
    setOther(networks.filter((network) => !network.tags.includes("favorite")));
  });

  const selectedTags = useSelectedTags();
  const filteredNetworks = useFilteredNetworks();

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {selectedTags.length === 0 ? (
        <>
          <NetworkSection
            title="Our favorites"
            icon={<FiHeart />}
            iconColor="rgb(190 24 93)"
            networks={sorted}
          />
          <NetworkSection title="All networks" networks={other} />
        </>
      ) : (
        <NetworkSection
          title="Results"
          icon={<FiSearch />}
          networks={filteredNetworks}
        />
      )}
    </section>
  );
};
